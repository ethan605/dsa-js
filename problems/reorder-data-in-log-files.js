/*
 * See more: https://leetcode.com/problems/reorder-data-in-log-files/
 */

const { MinHeap } = require('../data-structures/Heaps');

class LogsHeap extends MinHeap {
  compareValue(firstIndex, secondIndex) {
    const first = this.container[firstIndex];
    const second = this.container[secondIndex];

    if (first == null && second == null) return 0;
    if (first == null) return -1;
    if (second == null) return 1;

    const { content: firstContent, prefix: firstPrefix } = first;
    const { content: secondContent, prefix: secondPrefix } = second;

    if (firstContent < secondContent) return -1;
    if (firstContent > secondContent) return 1;

    if (firstPrefix < secondPrefix) return -1;
    if (firstPrefix > secondPrefix) return 1;

    return 0;
  }
}

function extractLogData(log) {
  const [prefix, ...contentParts] = log.split(' ');
  const isLettersLog = isNaN(parseInt(contentParts[0]));
  const content = contentParts.join(' ');
  return { content, prefix, isLettersLog };
}

function reorderLogFiles(logs) {
  // let lettersLogRoot;
  const logsHeap = new LogsHeap();
  const digitsLogs = [];

  logs.forEach(log => {
    const { content, prefix, isLettersLog } = extractLogData(log);

    if (isLettersLog) {
      logsHeap.push({ content, prefix });
    } else {
      digitsLogs.push({ content, prefix });
    }
  });

  // const sortedLettersLogs = lettersLogRoot.inOrderTraverse();
  const sortedLettersLogs = logsHeap.kthValues(logsHeap.size);
  return sortedLettersLogs.concat(digitsLogs).map(({ content, prefix }) => `${prefix} ${content}`);
}

const result = reorderLogFiles(['dig1 8 1 5 1', 'let1 art can', 'dig2 3 6', 'let2 own kit dig', 'let3 art zero']);
console.log(result);
