import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  

div
)) Card.displayName = "Card"

const CardHeader = React.forwardRef< HTMLDivElement, React.HTMLAttributes<HTMLDivElement>

(({ className, ...props }, ref) => (


div
)) CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef< HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>

(({ className, ...props }, ref) => (

<h3 ref={ref} className={cn( "text-2xl font-semibold leading-none tracking-tight", className )} {...props} /> )) CardTitle.displayName = "CardTitle"
const CardDescription = React.forwardRef< HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>

(({ className, ...props }, ref) => (


p
)) CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef< HTMLDivElement, React.HTMLAttributes<HTMLDivElement>

(({ className, ...props }, ref) => (


div
)) CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef< HTMLDivElement, React.HTMLAttributes<HTMLDivElement>

(({ className, ...props }, ref) => (


div
)) CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

