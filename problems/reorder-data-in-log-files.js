/*
 * See more: https://leetcode.com/problems/reorder-data-in-log-files/
 */

class LogNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  compareValue(otherValue) {
    const { content, prefix } = this.value;
    const { content: otherContent, prefix: otherPrefix } = otherValue;

    // console.log(content, otherContent, content < otherContent, content > otherContent);

    if (content < otherContent) return -1;
    if (content > otherContent) return 1;

    if (prefix < otherPrefix) return -1;
    if (prefix > otherPrefix) return 1;

    return 0;
  }

  insert(value) {
    // Insert left
    if (this.compareValue(value) > 0) {
      if (this.left == null) {
        this.left = new LogNode(value);
      } else {
        this.left.insert(value);
      }

      return;
    }

    // Insert right
    if (this.right == null) {
      this.right = new LogNode(value);
    } else {
      this.right.insert(value);
    }
  }

  inOrderTraverse() {
    const leftTraverse = this.left == null ? [] : this.left.inOrderTraverse();
    const rightTraverse = this.right == null ? [] : this.right.inOrderTraverse();
    return [...leftTraverse, this.value, ...rightTraverse];
  }
}

function extractLogData(log) {
  const [prefix, ...contentParts] = log.split(' ');
  const isLettersLog = isNaN(parseInt(contentParts[0]));
  const content = contentParts.join(' ');
  return { content, prefix, isLettersLog };
}

function reorderLogFiles(logs) {
  let lettersLogRoot;
  const digitsLogs = [];

  logs.forEach(log => {
    const { content, prefix, isLettersLog } = extractLogData(log);

    if (isLettersLog) {
      if (lettersLogRoot == null) {
        lettersLogRoot = new LogNode({ content, prefix });
      } else {
        lettersLogRoot.insert({ content, prefix });
      }
    } else {
      digitsLogs.push({ content, prefix });
    }
  });

  const sortedLettersLogs = lettersLogRoot.inOrderTraverse();
  return sortedLettersLogs.concat(digitsLogs).map(({ content, prefix }) => `${prefix} ${content}`);
}

const result = reorderLogFiles(['dig1 8 1 5 1', 'let1 art can', 'dig2 3 6', 'let2 own kit dig', 'let3 art zero']);
console.log(result);
