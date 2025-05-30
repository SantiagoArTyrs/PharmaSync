// Conceptual Tree display for Admin Dashboard
import type React from "react"
import { Tree } from "@/utils/dataStructures/Tree"
import type { TreeNode as GenericTreeNode } from "@/utils/dataStructures/Node"
import type { User } from "@/types"
import { Users, UserCheck, Shield } from "lucide-react"

interface UserRoleTreeProps {
  users: User[]
}

const RenderTreeNode: React.FC<{ node: GenericTreeNode<User | string>; level: number }> = ({ node, level }) => {
  const isRoleNode = typeof node.value === "string"
  const user = isRoleNode ? null : (node.value as User)

  const getIcon = () => {
    if (isRoleNode) {
      return node.value === "ADMINs" ? (
        <Shield className="h-5 w-5 text-red-500 mr-2" />
      ) : (
        <Users className="h-5 w-5 text-blue-500 mr-2" />
      )
    }
    return <UserCheck className="h-5 w-5 text-green-500 mr-2" />
  }

  return (
    <div style={{ marginLeft: `${level * 20}px` }} className="py-1">
      <div className="flex items-center">
        {getIcon()}
        <span className={`font-medium ${isRoleNode ? "text-gray-700" : "text-gray-600"}`}>
          {isRoleNode ? node.value : `${user?.username} (${user?.email})`}
        </span>
      </div>
      {node.children.length > 0 && (
        <div>
          {node.children.map((child) => (
            <RenderTreeNode key={child.id} node={child as GenericTreeNode<User | string>} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

const UserRoleTree: React.FC<UserRoleTreeProps> = ({ users }) => {
  const userTree = Tree.fromUsers(users)

  if (!userTree.root || userTree.root.children.length === 0) {
    return <p className="text-sm text-muted-foreground">No user hierarchy to display.</p>
  }

  return (
    <div>
      <RenderTreeNode node={userTree.root} level={0} />
    </div>
  )
}

export default UserRoleTree
