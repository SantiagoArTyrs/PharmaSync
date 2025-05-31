import { useState, useCallback, useEffect, useRef } from "react"
import { Carousel } from "@/dataStructures/DoublyCircularLinkedList"

interface UseCarouselOptions {
  autoAdvance?: boolean
  autoAdvanceInterval?: number
}

export function useCarousel<T>(initialItems: T[] = [], options: UseCarouselOptions = {}) {
  const { autoAdvance = false, autoAdvanceInterval = 3000 } = options

  const carouselRef = useRef<Carousel<T>>(new Carousel<T>())
  const carousel = carouselRef.current

  useEffect(() => {
    carousel.clear()
    initialItems.forEach(item => carousel.addItem(item))
  }, [initialItems, carousel])

  const [currentItem, setCurrentItem] = useState<T | null>(carousel.getCurrentItem())
  const [currentIndex, setCurrentIndex] = useState<number>(carousel.getCurrentIndex())

  const updateState = useCallback(() => {
    setCurrentItem(carousel.getCurrentItem())
    setCurrentIndex(carousel.getCurrentIndex())
  }, [carousel])

  const addItem = useCallback(
    (item: T) => {
      carousel.addItem(item)
      updateState()
    },
    [carousel, updateState]
  )

  const next = useCallback(() => {
    carousel.next()
    updateState()
  }, [carousel, updateState])

  const previous = useCallback(() => {
    carousel.previous()
    updateState()
  }, [carousel, updateState])

  // Modificado para aceptar `null` y limpiar selección
  const goTo = useCallback(
    (item: T | null) => {
      if (item === null) {
        carousel.clearCurrent() // Aquí debes implementar clearCurrent o equivalente en Carousel para deseleccionar
        setCurrentItem(null)
        setCurrentIndex(-1)
      } else {
        carousel.goTo(item)
        updateState()
      }
    },
    [carousel, updateState]
  )

  useEffect(() => {
    if (autoAdvance && !carousel.isEmpty()) {
      const stopAutoAdvance = carousel.autoAdvance(autoAdvanceInterval, () => {
        updateState()
      })
      return stopAutoAdvance
    }
  }, [autoAdvance, autoAdvanceInterval, carousel, updateState])

  return {
    currentItem,
    currentIndex,
    itemCount: carousel.getItemCount(),
    allItems: carousel.getAllItems(),
    isEmpty: carousel.isEmpty(),
    addItem,
    next,
    previous,
    goTo,
  }
}
