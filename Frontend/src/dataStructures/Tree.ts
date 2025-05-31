import { TreeNode as GenericTreeNode } from "./Node" // Using the TreeNode from Node.ts
import type { User } from "@/types" // Assuming User type for this example

// This is a simplified Tree structure for demonstration.
// In a real app, you might have more complex tree operations.

export class Tree<T> {
  public root: GenericTreeNode<T> | null

  constructor(rootValue?: T, rootId?: string) {
    this.root = rootValue && rootId ? new GenericTreeNode<T>(rootId, rootValue) : null
  }

  // Example: Build a simple tree from a flat list of users based on roles
  // This is highly conceptual as the API doesn't provide hierarchical data.
  static fromUsers(users: User[]): Tree<User | string> {
    const tree = new Tree<User | string>("Roles", "root-roles")
    if (!tree.root) return tree // Should not happen if constructor works

    const adminNode = new GenericTreeNode<User | string>("admin-role", "ADMINs")
    const userNode = new GenericTreeNode<User | string>("user-role", "USERs")

    users.forEach((user) => {
      const userAsNodeValue = new GenericTreeNode<User | string>(user.id, user) // Leaf node with user object
      if (user.role === "ADMIN") {
        adminNode.addChild(userAsNodeValue)
      } else if (user.role === "USER") {
        userNode.addChild(userAsNodeValue)
      }
    })

    if (adminNode.children.length > 0) tree.root.addChild(adminNode)
    if (userNode.children.length > 0) tree.root.addChild(userNode)

    return tree
  }

  // Basic traversal (e.g., Depth First Search for display)
  traverseDF(node: GenericTreeNode<T> | null, callback: (node: GenericTreeNode<T>) => void): void {
    if (!node) return
    callback(node)
    node.children.forEach((child) => this.traverseDF(child, callback))
  }
}
