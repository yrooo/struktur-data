export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverImage: string;
  audioFile: string;
};

export class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;
  prev: ListNode<T> | null = null;
  index: number;

  constructor(value: T, index: number) {
    this.value = value;
    this.index = index;
  }
}

export class DoublyLinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  current: ListNode<T> | null = null;
  private nodes: ListNode<T>[] = [];

  append(value: T): ListNode<T> {
    const node = new ListNode(value, this.nodes.length);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else if (this.tail) {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }

    this.nodes.push(node);

    if (!this.current) {
      this.current = node;
    }

    return node;
  }

  goNext(): ListNode<T> | null {
    if (!this.current || !this.current.next) {
      return null;
    }

    this.current = this.current.next;
    return this.current;
  }

  goPrev(): ListNode<T> | null {
    if (!this.current || !this.current.prev) {
      return null;
    }

    this.current = this.current.prev;
    return this.current;
  }

  setCurrentByIndex(index: number): ListNode<T> | null {
    const node = this.nodes[index];
    if (!node) {
      return null;
    }

    this.current = node;
    return node;
  }

  getCurrentIndex(): number {
    return this.current ? this.current.index : 0;
  }

  getNodes(): ListNode<T>[] {
    return this.nodes;
  }
}
