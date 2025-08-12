export class Tokenizer {
  private vocabulary: Map<string, number>;
  private reverseVocab: Map<number, string>;
  private readonly UNKNOWN_OFFSET = 1000;

  constructor() {
    this.vocabulary = new Map();
    this.reverseVocab = new Map();
    this.initializeVocabulary();
  }

  private initializeVocabulary(): void {
    const commonTokens = [
      // Articles
      "a", "an", "the",
      // Prepositions
      "in", "on", "at", "to", "for", "of", "with", "by", "from", "up", "down",
      // Conjunctions
      "and", "or", "but", "if", "when", "while", "because", "although",
      // Common verbs
      "is", "are", "was", "were", "be", "been", "have", "has", "had", "do", "does", "did",
      "will", "would", "could", "should", "can", "may", "might", "must",
      // Common words
      "hello", "world", "test", "text", "token", "encode", "decode", "this", "that", "these", "those",
      "here", "there", "where", "what", "why", "how", "who", "which", "whose"
    ];

    commonTokens.forEach((token, index) => {
      this.vocabulary.set(token.toLowerCase(), index);
      this.reverseVocab.set(index, token.toLowerCase());
    });
  }

  encode(text: string): number[] {
    if (!text || typeof text !== 'string') {
      throw new Error('Input must be a non-empty string');
    }

    const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    
    return words.map(word => {
      if (this.vocabulary.has(word)) {
        return this.vocabulary.get(word)!;
      } else {
        // Handle unknown words by converting to character codes
        return word.split('').map(char => char.charCodeAt(0) + this.UNKNOWN_OFFSET);
      }
    }).flat();
  }

  decode(tokens: number[]): string {
    if (!Array.isArray(tokens)) {
      throw new Error('Input must be an array of numbers');
    }

    return tokens.map(token => {
      if (this.reverseVocab.has(token)) {
        return this.reverseVocab.get(token)!;
      } else {
        // Convert unknown tokens back to characters
        return String.fromCharCode(token - this.UNKNOWN_OFFSET);
      }
    }).join(' ');
  }

  addToken(token: string): void {
    if (!token || typeof token !== 'string') {
      throw new Error('Token must be a non-empty string');
    }

    const lowerToken = token.toLowerCase();
    if (!this.vocabulary.has(lowerToken)) {
      const newId = this.vocabulary.size;
      this.vocabulary.set(lowerToken, newId);
      this.reverseVocab.set(newId, lowerToken);
    }
  }

  getVocabularySize(): number {
    return this.vocabulary.size;
  }

  hasToken(token: string): boolean {
    return this.vocabulary.has(token.toLowerCase());
  }
}

export const tokenizer = new Tokenizer();
