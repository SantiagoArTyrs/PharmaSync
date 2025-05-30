"use client"

import { useState, useEffect } from "react"
import { DoublyCircularLinkedList } from "@/utils/dataStructures/DoublyCircularLinkedList"
import type { DLLNode } from "@/utils/dataStructures/Node" // Using DLLNode for DCLL
import { ChevronLeft, ChevronRight, Info } from "lucide-react"

interface FeaturedItem {
  id: string
  title: string
  description: string
  imageUrl?: string // Optional image
}

const mockFeaturedItems: FeaturedItem[] = [
  {
    id: "feat1",
    title: "New Health Guidelines",
    description: "Updated recommendations for daily exercise and diet.",
    imageUrl: "/placeholder.svg?width=300&height=150",
  },
  {
    id: "feat2",
    title: "Seasonal Flu Shots Available",
    description: "Protect yourself and your community. Get your flu shot today.",
    imageUrl: "/placeholder.svg?width=300&height=150",
  },
  {
    id: "feat3",
    title: "Understanding Your Lab Results",
    description: "A quick guide to common blood test markers.",
    imageUrl: "/placeholder.svg?width=300&height=150",
  },
]

const FeaturedInfoPage = () => {
  const [carouselList, setCarouselList] = useState<DoublyCircularLinkedList<FeaturedItem>>(
    new DoublyCircularLinkedList(),
  )
  const [currentItemNode, setCurrentItemNode] = useState<DLLNode<FeaturedItem> | null>(null)

  useEffect(() => {
    const newList = new DoublyCircularLinkedList<FeaturedItem>()
    mockFeaturedItems.forEach((item) => newList.append(item))
    setCarouselList(newList)
    if (newList.head) {
      setCurrentItemNode(newList.head)
    }
  }, [])

  const navigatePrev = () => {
    if (currentItemNode?.prev) {
      setCurrentItemNode(currentItemNode.prev)
    }
  }

  const navigateNext = () => {
    if (currentItemNode?.next) {
      setCurrentItemNode(currentItemNode.next)
    }
  }

  if (!currentItemNode) {
    return <div className="text-center p-4">Loading featured information...</div>
  }

  const currentItem = currentItemNode.value

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-primary text-center">Featured Information (DCLL Carousel)</h1>
      <p className="mb-4 text-sm text-muted-foreground text-center">
        This page demonstrates a cyclic carousel using a Doubly Circular Linked List.
      </p>
      <div className="relative p-6 bg-white shadow-xl rounded-lg border border-border overflow-hidden">
        <div className="text-center">
          {currentItem.imageUrl && (
            <img
              src={currentItem.imageUrl || "/placeholder.svg"}
              alt={currentItem.title}
              className="mx-auto mb-4 rounded-md h-40 object-cover"
            />
          )}
          <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center justify-center">
            <Info className="h-6 w-6 text-primary mr-2" /> {currentItem.title}
          </h2>
          <p className="text-gray-600 min-h-[4rem]">{currentItem.description}</p>
        </div>

        <button
          onClick={navigatePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800/50 text-white p-2 rounded-full hover:bg-gray-800/70 transition-colors"
          title="Previous Item"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={navigateNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/50 text-white p-2 rounded-full hover:bg-gray-800/70 transition-colors"
          title="Next Item"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

export default FeaturedInfoPage
