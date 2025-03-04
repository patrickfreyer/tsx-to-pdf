# Style Rules

## Important Notes

1. **Remove Width Limitation**
   - Use `w-full`

2. **Remove Rounded Edges around top-level container**
   - Don't use `rounded-xl` for the main container

## Important Style Rules

### Main Container
- Background: Gradient from indigo-900 to purple-900 (`bg-gradient-to-br from-indigo-900 to-purple-900`)
- Text color: White (`text-white`)
- Padding: 2rem on all sides (`p-8`)
- Shadow: Extra large (`shadow-xl`)
- Width: Full width (`w-full`)

### Grid Layout
- Single column on mobile, two columns on medium screens and up (`grid grid-cols-1 md:grid-cols-2 gap-5`)
- Gap between grid items: 1.25rem (`gap-5`)

### Section Cards
- Background: Semi-transparent indigo with blur effect (`bg-indigo-800/40 backdrop-blur-sm`)
- Border: Light indigo border (`border border-indigo-600/30`)
- Padding: 1.25rem (`p-5`)
- Corners: Rounded (`rounded-lg`)
- Hover effect: Slightly darker background (`hover:bg-indigo-800/60 transition-colors`)

### Section Headers
- Flex layout for icon and text alignment (`flex items-center`)
- Bottom border: Light pink (`border-b border-pink-500/30`)
- Text: Large, bold, pink (`text-lg font-bold text-pink-300`)
- Icon: Pink, medium size (`text-pink-300` with size={22})

### List Items
- Vertical spacing between items: 0.75rem (`space-y-3`)
- Flex layout for icon and text alignment (`flex items-start`)
- Icon containers: Rounded, semi-transparent violet background (`bg-violet-700/40 p-1 rounded-full`)
- Text color: Light violet (`text-violet-100`)

### Supplement Grid
- Three columns (`grid grid-cols-3 gap-3`)
- Items: Semi-transparent background with border (`bg-indigo-700/30 border border-indigo-500/20`)
- Hover effect: Slightly darker background (`hover:bg-indigo-700/50 transition-colors`)
- Text: Small, medium weight (`text-sm font-medium`)

### Typography
- Main title: Extra large, bold, gradient text (`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-300`)
- Section titles: Large, bold, pink (`text-lg font-bold text-pink-300`)
- List text: Light violet (`text-violet-100`)
- Footer text: Extra small, lighter violet (`text-xs text-violet-300/400`)

### Icons
- Header icons: Pink, size 22px (`text-pink-300` with size={22})
- List item icons: Light violet, size 16px (`text-violet-200` with size={16})
- Main title icon: Rotated plane (`transform rotate-45`)

### References
- Superscript format (`<sup>`)
- Extra small text size (`text-xs`)
- Two-column grid layout for citations on medium screens and up (`grid grid-cols-1 md:grid-cols-2`) 