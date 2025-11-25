"use client"

import React, { useState } from "react"
import { clx } from "@medusajs/ui"

type AccordionItemProps = {
  title: string
  children: React.ReactNode
  headingSize?: "small" | "medium" | "large"
  value: string
  isOpen?: boolean
  onToggle?: () => void
}

type AccordionProps = {
  children: React.ReactNode
  type?: "single" | "multiple"
}

const AccordionContext = React.createContext<{
  type: "single" | "multiple"
  openItems: string[]
  toggleItem: (value: string) => void
}>({
  type: "single",
  openItems: [],
  toggleItem: () => {},
})

const Accordion = ({ children, type = "single" }: AccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (value: string) => {
    if (type === "single") {
      setOpenItems((prev) => (prev.includes(value) ? [] : [value]))
    } else {
      setOpenItems((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      )
    }
  }

  return (
    <AccordionContext.Provider value={{ type, openItems, toggleItem }}>
      <div className="flex flex-col">{children}</div>
    </AccordionContext.Provider>
  )
}

const AccordionItem = ({
  title,
  children,
  headingSize = "medium",
  value,
}: AccordionItemProps) => {
  const { openItems, toggleItem } = React.useContext(AccordionContext)
  const isOpen = openItems.includes(value)

  const headingSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  }

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={() => toggleItem(value)}
      >
        <span
          className={clx("font-semibold", headingSizeClasses[headingSize])}
        >
          {title}
        </span>
        <span
          className={clx(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        className={clx(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  )
}

Accordion.Item = AccordionItem

export default Accordion
