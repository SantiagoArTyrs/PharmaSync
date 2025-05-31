"use client"

import React from "react"
import { ChevronRight, Home } from "lucide-react"
import { SinglyLinkedList } from "@/dataStructures/SinglyLinkedList"

interface BreadcrumbItem {
  id: string
  label: string
  path: string
  isActive?: boolean
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[]
  onNavigate?: (item: BreadcrumbItem) => void
  maxItems?: number
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ items, onNavigate, maxItems = 5 }) => {
  // Use SinglyLinkedList to manage breadcrumb trail
  const breadcrumbList = React.useMemo(() => {
    const list = new SinglyLinkedList<BreadcrumbItem>()
    items.forEach((item) => list.append(item))
    return list
  }, [items])

  const breadcrumbArray = breadcrumbList.toArray()

  // Truncate if too many items
  const displayItems =
    breadcrumbArray.length > maxItems
      ? [
          breadcrumbArray[0], // First item (usually Home)
          { id: "ellipsis", label: "...", path: "", isActive: false },
          ...breadcrumbArray.slice(-maxItems + 2), // Last few items
        ]
      : breadcrumbArray

  const handleClick = (item: BreadcrumbItem) => {
    if (item.id !== "ellipsis" && !item.isActive) {
      onNavigate?.(item)
    }
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Home className="h-4 w-4" />
      <ChevronRight className="h-4 w-4" />

      {displayItems.map((item, index) => (
        <React.Fragment key={`${item.id}-${index}`}>
          {item.id === "ellipsis" ? (
            <span className="px-2">...</span>
          ) : (
            <button
              onClick={() => handleClick(item)}
              className={`px-2 py-1 rounded hover:bg-muted transition-colors ${
                item.isActive ? "text-foreground font-medium cursor-default" : "hover:text-foreground cursor-pointer"
              }`}
              disabled={item.isActive}
            >
              {item.label}
            </button>
          )}

          {index < displayItems.length - 1 && <ChevronRight className="h-4 w-4" />}
        </React.Fragment>
      ))}
    </nav>
  )
}
