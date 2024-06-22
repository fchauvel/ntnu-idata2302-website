    class Node

  def initialize(capacity)
    unless capacity > 1
      raise ArgumentError.new("Invalid capacity")
    end
    @capacity = capacity
  end

  def minimum_key
    raise "Abstract class"
  end

  def size
    raise "Abstract class"
  end

  def find(key)
    raise "Abstract class"
  end

  def insert(key, item)
    raise "Abstract class"
  end

  def is_overflowing
    size > @capacity
  end

  def split
    raise "Abstract class"
  end

  def remove(key)
    raise "Abstract class"
  end

  def is_underflowing
    size < minimum_size
  end

  def minimum_size
    @capacity / 2
  end

  def has_extra
    return size > minimum_size
  end

  def merge_with(node)
    raise "Abstract class"
  end

end

class Branch < Node

  def initialize(capacity, branches)
    # if branches.count < capacity / 2
    #   raise ArgumentError.new("Shall have at least #{capacity / 2} branch(es)")
    # end
    super(capacity)
    @keys = branches[1...branches.count].map{ |branch| branch.minimum_key }
    @branches = branches
  end

  def branches
    return @branches
  end

  def size
    return @branches.count
  end

  def find(key)
    branch, index = pick_branch(key)
    return branch.find(key)
  end

  private
  def pick_branch(key)
    index = (0...@keys.count).find{|i| @keys[i] > key}
    if index.nil?
      return @branches.last, @branches.count - 1
    else
      return @branches[index], index
    end
  end

  public
  def insert(key, item)
    branch, index = pick_branch(key)
    branch.insert(key, item)
    if branch.is_overflowing
      key, left, right = branch.split
      @keys[index,1] = [index, key]
      @branches[index,1] = [left, right]
    end
  end

  def split
    raise RuntimeError.new("Not overflowing") unless is_overflowing
    half = @branches.count / 2
    return @branches[half].minimum_key,
           Branch.new(@capacity, @branches.take(half)),
           Branch.new(@capacity, @branches.drop(half))
  end

  def remove(key)
    branch, index = pick_branch(key)
    branch.remove(key)
    if branch.is_underflowing
      left, right = siblings_of(index)
      if left and left.has_extra
        take_from_left(index)
      elsif right and right.has_extra
        take_from_right(index)
      elsif left
        merge_with_left(index)
      else
        merge_with_right(index)
      end
    end
  end

  def siblings_of(index)
    if index == 0
      return nil, @branches[index+1]
    elsif index == @branches.count - 1
      return @branches[index-1], nil
    else
      return @branches[index-1], @branches[index+1]
    end
  end

  def take_from_left(index, left)
    key, item = left.remove_last_entry
    @branches[index].add(@keys[index-1], item)
    @key[index-1] = key
  end

  def take_from_right(right)
    key, item = right.remove_first_entry
    @branches[index].add_entry(@key[index], item)
    @keys[index] = key
  end

  def merge_with_left(index)
    merge = @branches[index-1].merge_with(@branches[index])
    @branches.delete_at(index)
    @branches[index-1] = merge
    @keys.delete_at(index-1)
  end

  def merge_with_right(index)
    merge = @branches[index].merge_with(@branches[index+1])
    @branches.delete_at(index+1)
    @branches[index] = merge
    @keys.delete_at(index)
  end

end

class Leaf < Node

  def self.empty(capacity)
    return Leaf.new(capacity, [])
  end

  def self.with_entries(capacity, entries)
    return Leaf.new(capacity, entries.map{|key, item| Entry.new(key, item)})
  end

  def initialize(capacity, entries)
    super(capacity)
    @entries = entries.sort_by{ |entry| entry.key}
  end

  def entries
    return @entries
  end

  def size
    return @entries.count
  end

  def minimum_key
    if size == 0
      raise RuntimeError.new("Empty leaf has no minimum key")
    end
    return @entries[0].key
  end

  def find(key)
    match = @entries.find{|e| e.key == key}
    return match.item unless match.nil?
    return nil
  end

  def insert(key, item)
    index = 0
    inserted = false
    until inserted or index >= @entries.count
      entry = @entries[index]
      if entry.key > key
        @entries.insert(index, Entry.new(key, item))
        inserted = true
      end
      index += 1
    end
    @entries.push(Entry.new(key, item))
  end

  def split
    raise RuntimeError.new("Not overflowing") unless is_overflowing
    half = @entries.count / 2
    return @entries[half].key,
           Leaf.new(@capacity, @entries.take(half)),
           Leaf.new(@capacity, @entries.drop(half))
  end

  def merge_with(node)
    if node.is_underflowing or self.is_underflowing
      return Leaf.new(@capacity, @entries + node.entries)
    end
    raise ArgumentError.new("Neither node is underflowing")
  end

end

Entry = Struct.new(:key, :item)

