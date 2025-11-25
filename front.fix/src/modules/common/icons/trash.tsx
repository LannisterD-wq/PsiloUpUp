import React from "react"

type IconProps = {
  color?: string
  size?: string | number
} & React.SVGAttributes<SVGElement>

const Trash: React.FC<IconProps> = ({
  color = "currentColor",
  size = 20,
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <path
        d="M2.5 5H17.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8334 5V16.6667C15.8334 17.5 15 18.3333 14.1667 18.3333H5.83335C5.00002 18.3333 4.16669 17.5 4.16669 16.6667V5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66669 5.00002V3.33335C6.66669 2.50002 7.50002 1.66669 8.33335 1.66669H11.6667C12.5 1.66669 13.3334 2.50002 13.3334 3.33335V5.00002"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Trash
