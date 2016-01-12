require 'rails_helper'

RSpec.describe Todo, :type => :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  it 'is invalid without a title' do
    todo = Todo.new(title: nil)
    todo.valid?
    expect(todo.errors[:title]).to include("can't be blank")
  end
end
