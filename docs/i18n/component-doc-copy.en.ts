import { defineComponentDocCopy } from "@/i18n/component-doc-copy";

export const componentDocCopyEn = defineComponentDocCopy({
  sidebar: {
    summary: "Application navigation with desktop collapse and a mobile Sheet.",
    description: "SidebarProvider owns desktop and mobile state plus the Ctrl/Cmd+B shortcut. Desktop can collapse off-canvas or to icon width, while mobile reuses the existing Sheet. Menus, tooltips, and focus states stay on the existing neumorphic token system.",
    props: [
      "Controls the initial or controlled desktop open state.",
      "Chooses whether a collapsed sidebar disappears or remains at icon width.",
      "Chooses the side and surface presentation.",
      "Localizes the accessible name of the collapse toggle.",
      "Marks the active destination and provides a tooltip when icon-collapsed.",
    ],
    accessibility: [
      "Navigation links need real destinations and readable names; use isActive for the current location.",
      "Icon-collapsed items retain accessible names, and tooltips supplement rather than replace those names.",
      "The mobile Sidebar behaves as a modal Sheet and closes with Escape; desktop also supports Ctrl or Command+B.",
    ],
  },
  carousel: {
    summary: "A sequential content view navigated by touch, buttons, and arrow keys.",
    description: "Uses Embla Carousel for scroll position and dragging while neumorphism is limited to the slide surfaces and controls. Previous and next buttons disable automatically at the ends.",
    props: [
      "Sets the scroll axis and matching arrow-key behavior.",
      "Passes Embla options such as loop and align.",
      "Provides the Embla API instance for external integrations.",
      "Contains the real content of one slide.",
      "Localizes the accessible name of the previous and next buttons.",
    ],
    accessibility: [
      "Give Carousel an aria-label or aria-labelledby that identifies the region.",
      "Slides use group semantics with a carousel slide description, while navigation buttons expose disabled state at the ends.",
      "Horizontal carousels support Left and Right; vertical carousels support Up and Down.",
    ],
  },
  resizable: {
    summary: "Split panels whose proportions can be adjusted with pointer or keyboard.",
    description: "Uses react-resizable-panels for size calculation and separator accessibility. Neumorphism styles only the panel boundary and handle instead of reimplementing panel state.",
    props: [
      "Sets the panel split direction.",
      "Sets the initial panel size.",
      "Constrains how far a panel may shrink or grow.",
      "Shows a visual grip in the middle of the separator.",
      "Keeps the separator visible while disabling resizing.",
    ],
    accessibility: [
      "ResizableHandle relies on the library separator semantics and current size values; do not add a fake slider.",
      "Keyboard users can focus the separator and change panel size with arrow keys.",
      "The visual grip is aria-hidden while the separator itself owns the interaction meaning.",
    ],
  },
  "input-otp": {
    summary: "A verification-code input that combines one real input with multiple visual slots.",
    description: "Uses input-otp for focus, paste, and automatic advancement while styling only the visual slots with neumorphic surfaces. Multiple boxes are visible, but the accessibility tree and form value remain a single input.",
    props: [
      "Sets the allowed verification-code length.",
      "Sets the controlled or initial uncontrolled code value.",
      "Runs when the complete code value changes.",
      "Extends the outer container that wraps slot groups.",
      "Selects which position of the complete code this visual slot displays.",
    ],
    accessibility: [
      "Give InputOTP an aria-label or associated label that explains the verification code purpose.",
      "Although multiple slots are visible, keep one real input instead of exposing one textbox per character.",
      "Do not block paste or keyboard entry; connect validation errors through separate descriptive text.",
    ],
  },
  drawer: {
    summary: "A bottom or side task panel that can be dismissed with a swipe.",
    description: "Uses Base UI Drawer gestures and focus management. Sheet is a fixed task panel; Drawer is better for temporary touch-first surfaces that users can swipe away or open from another edge.",
    props: [
      "Sets the opening, closing, and swipe direction.",
      "Controls the Drawer open state.",
      "Configures intermediate resting points when needed.",
      "Composes an existing Button or other element as the trigger.",
      "Extends the panel styling while preserving direction and gesture behavior.",
    ],
    accessibility: [
      "Provide DrawerTitle and DrawerDescription so assistive technology can identify the opened panel.",
      "A modal Drawer isolates background content and focus while open and should close with Escape.",
      "Do not make swiping the only way to dismiss the Drawer; include an explicit DrawerClose control.",
    ],
  },
  "context-menu": {
    summary: "A pointer-positioned action menu with checkbox, radio, and submenu items.",
    description: "Preserves Base UI pointer anchoring and keyboard navigation while rendering the popup as a floating neumorphic surface. Compose ordinary, checkable, radio, submenu, and destructive items.",
    props: [
      "Controls the menu open state.",
      "Adjusts popup placement and spacing relative to the pointer anchor.",
      "Keeps an item visible while preventing execution.",
      "Controls the state of a checkable menu item.",
      "Controls the selection among mutually exclusive radio items.",
    ],
    accessibility: [
      "Make the ContextMenuTrigger region an understandable target for both pointer and keyboard users.",
      "When open, arrow keys move between items, Enter or Space activates one, and Escape closes the menu.",
      "Describe destructive actions explicitly instead of relying on color alone.",
    ],
  },
  command: {
    summary: "A searchable command palette and quick-navigation list with keyboard selection.",
    description: "Preserves cmdk filtering, active-item state, and keyboard navigation while rendering the input as inset and the active item as pressed. CommandDialog composes it with the existing Dialog.",
    props: [
      "Controls whether cmdk applies its built-in search filtering.",
      "Controls the currently active item.",
      "Controls the search query or leaves the input uncontrolled.",
      "Defines the searchable value and selection callback for an item.",
      "Keeps an item in the result model while preventing selection.",
    ],
    accessibility: [
      "Give CommandInput a placeholder or aria-label that describes the search purpose.",
      "Arrow keys move the active item and Enter selects it; retain the visible focus treatment.",
      "Provide an explicit CommandEmpty state when filtering returns no items.",
    ],
  },
"chart": {"summary": "Responsive chart surfaces, tooltips and exact-data tables.", "description": "Compose Recharts axes and series directly. Data marks stay flat and legible; neumorphic depth belongs to the surrounding surface.", "props": ["Readable chart title and description.", "A table from the same data and its disclosure label.", "The state to display when no records are available.", "Pass ordinary Recharts Tooltip options."], "accessibility": ["Use accessibilityLayer, redundant line styles and labels, and an exact-data table.", "Examples disable animation. Applications own the motion policy of custom series."]},
"navigation-menu": {"summary":"Keyboard-aware website navigation with links and floating panels.","description":"Preserves Base UI navigation behavior and uses inset open states. Place one NavigationMenuViewport inside the root.","props":["The open item and its change handler.","Compose your framework link through render.","Controls popup placement and spacing."],"accessibility":["Use real href links for destinations and label the nav landmark.","Test Tab, arrow keys and Escape, and retain visible focus."]},
"menubar": {"summary":"Application command menus with roving keyboard focus.","description":"Menubar owns focus navigation; the existing Dropdown Menu parts own popup and selection behavior.","props":["Sets the direction of keyboard navigation.","Disables the menu trigger.","Controlled state of a checkable item."],"accessibility":["Use for application commands, not ordinary page links, and label the menubar.","Arrow keys move between menus. Disabled items cannot execute."]},
  accordion: {
    summary:
      "A disclosure group that expands one section at a time or multiple sections together.",
    description:
      "Preserves Base UI Accordion state management and accessibility relationships while rendering open items as inset surfaces. Supports both multiple selection and controlled or uncontrolled usage.",
    props: [
      "Allows multiple items to remain open at the same time.",
      "The controlled value or initial uncontrolled value of the open items.",
      "Called when the set of open items changes.",
      "A unique value that identifies the item.",
      "Disables the item trigger.",
      "Keeps the panel in the DOM while it is closed.",
    ],
    accessibility: [
      "Base UI manages the aria-expanded and aria-controls relationships between each trigger and panel.",
      "Move focus to a trigger with Tab, then press Enter or Space to open or close the item.",
      "AccordionTrigger renders a real button, so do not place another button inside its heading.",
    ],
  },
  alert: {
    summary:
      "A message that communicates important status and outcomes on a raised surface.",
    description:
      "A composable Alert that aligns an icon, title, and description. It provides default, success, and destructive variants, each combining color with border and text contrast.",
    props: [
      "Selects the semantic meaning and visual treatment of the message.",
      "Arranges the icon, AlertTitle, and AlertDescription.",
      "Extends the default surface styles.",
    ],
    accessibility: [
      "Alert uses role=alert and is appropriate for important messages that appear dynamically.",
      "Static guidance that is present on page load may not need the immediate announcement from role=alert; override the role or use another container when appropriate.",
      "Mark decorative icons with aria-hidden=true and communicate the same meaning in the title and description.",
    ],
  },
  avatar: {
    summary:
      "A profile surface that preserves its fallback when an image fails to load.",
    description:
      "Built on Base UI Avatar to manage image loading and fallback transitions. Provides three sizes, a status badge, overlapping groups, and a remaining-member count.",
    props: [
      "Changes the size of the Avatar and its badge together.",
      "The URL of the image to display.",
      "Alternative text identifying the person or subject represented by the image.",
      "The delay before the fallback is displayed.",
      "Displays a status dot or small status icon.",
    ],
    accessibility: [
      "Use the person's name as alt text for an identifying image; an empty alt is acceptable when the same name appears next to it.",
      "If AvatarBadge conveys meaning such as online status, provide an aria-label or visually hidden text.",
      "Add an aria-label that explains the meaning of a count such as +8 in AvatarGroupCount.",
    ],
  },
  badge: {
    summary:
      "A concise inline label for displaying status and classification clearly.",
    description:
      "A lightweight span-based component with five variants. It supplies visual emphasis without adding interaction or an implicit ARIA role.",
    props: [
      "Selects the emphasis level and color for the status.",
      "A short status or classification label.",
      "Extends the size, spacing, and color styles.",
    ],
    accessibility: [
      "Badge renders as a span by default, so provide text that explicitly communicates the status.",
      "Do not rely on color alone; use clear labels such as Ready or Failed.",
      "When interaction is required, place Badge inside a Button or link instead of attaching events directly to it.",
    ],
  },
  breadcrumb: {
    summary:
      "Displays the path to the current page as a meaningful ordered list.",
    description:
      "Preserves the native semantics of nav and ol while composing links, the current page, separators, and collapsed paths. The current page is automatically marked with aria-current=page.",
    props: [
      "The accessible name of the path navigation region.",
      "The actual URL of a parent location.",
      "The current page name, marked with aria-current=page.",
      "A visual separator hidden from assistive technology.",
    ],
    accessibility: [
      "Breadcrumb is a nav labeled with aria-label=breadcrumb, and its path is an ordered ol.",
      "Use BreadcrumbPage instead of a link for the final item so it exposes aria-current=page.",
      "Separator and Ellipsis are decorative and hidden from assistive technology.",
    ],
  },
  button: {
    summary:
      "The primary action control with raised, pressed, and primary states.",
    description:
      "Uses a native button to preserve form behavior and keyboard interaction. Provides five variants and four sizes, with an inset shadow representing the pressed state.",
    props: [
      "Selects the button meaning and degree of surface emphasis.",
      "Selects the height and horizontal padding.",
      "Determines the native button behavior.",
      "Disables pointer and keyboard interaction.",
    ],
    accessibility: [
      "Because it uses a native button, Space and Enter behavior and disabled semantics are preserved.",
      "Always provide an aria-label that describes the action of an icon-size button.",
      "For navigation, use a semantic anchor or Link instead of a Button click handler.",
    ],
  },
  card: {
    summary:
      "A surface that groups content at raised, soft, inset, or flat depth.",
    description:
      "A layout component composed from Header, Title, Description, Action, Content, and Footer. The root is a div by default, so choose headings and interactive elements that match the content semantics.",
    props: [
      "Selects the surface depth and border treatment.",
      "Arranges the composable Card subcomponents.",
      "An action or status area on the right side of the Header.",
      "The Card heading, rendered as h3 by default.",
    ],
    accessibility: [
      "Card is a div and does not automatically add a landmark or article role.",
      "If h3 does not fit the page heading hierarchy, use an appropriate heading element instead of CardTitle.",
      "When making the entire Card clickable, avoid nesting other buttons or links inside it.",
    ],
  },
  checkbox: {
    summary:
      "A native checkbox supporting boolean and indeterminate states.",
    description:
      "Layers a neumorphic surface over a transparent native input to preserve form submission and browser accessibility. Supports controlled, uncontrolled, and indeterminate states with a shadcn-style onCheckedChange callback.",
    props: [
      "The controlled checked or mixed state.",
      "The initial checked state for uncontrolled usage.",
      "Called when the checked state changes.",
      "Disables input and pointer interaction.",
      "Native checkbox attributes used for form submission.",
    ],
    accessibility: [
      "A real input[type=checkbox] preserves form submission and keyboard interaction with Space.",
      "Connect Label htmlFor to the Checkbox id, or place Checkbox inside a label.",
      "In the indeterminate state, both aria-checked=mixed and the DOM indeterminate property are set.",
    ],
  },
  dialog: {
    summary:
      "A modal surface that safely traps focus and restores it to the original trigger.",
    description:
      "Built on Base UI Dialog to compose a Portal, Backdrop, Popup, title, description, and close actions. The primitive handles Escape, outside clicks, focus trapping, and focus restoration.",
    props: [
      "The controlled open state or initial uncontrolled open state.",
      "Called when the open state changes.",
      "Determines background interaction and focus-trap behavior.",
      "Composes trigger or close behavior onto a button or link.",
      "Displays the default close button in the upper-right corner.",
      "Extends the Backdrop color, blur, and transition independently.",
      "Prevents an outside pointer press from closing Dialog.",
    ],
    accessibility: [
      "Provide DialogTitle inside DialogContent and connect supporting copy with DialogDescription.",
      "Base UI manages the modal focus trap, closing with Escape, and restoring focus to the trigger after close.",
      "Wrap the cancel action in DialogFooter with DialogClose to provide an explicit close behavior.",
    ],
  },
  "dropdown-menu": {
    summary:
      "A contextual menu for keyboard navigation through actions, selections, and submenus.",
    description:
      "A complete composable API built on Base UI Menu. Combines regular items, checkboxes, radio groups, labels, separators, shortcuts, and nested submenus on one surface.",
    props: [
      "The controlled open state or initial uncontrolled open state.",
      "Called when the menu open state changes.",
      "Composes trigger behavior onto a button or link.",
      "Positions the popup relative to the trigger.",
      "The distance between the trigger and popup.",
      "Selects the regular or destructive action style.",
      "Aligns text with rows that include an indicator.",
      "The controlled state of a checkbox item.",
      "Called when a checkbox item state changes.",
    ],
    accessibility: [
      "Base UI handles Arrow key navigation, Home, End, typeahead, closing with Escape, and focus restoration.",
      "Give each DropdownMenuItem a clear command label, and distinguish destructive actions in the wording as well as with variant.",
      "Use checked with onCheckedChange to manage CheckboxItem state explicitly.",
    ],
  },
  input: {
    summary:
      "An inset single-line input with clear focus and validation states.",
    description:
      "Forwards every native input attribute while consistently styling the neumorphic inset surface, file input, disabled state, and aria-invalid state.",
    props: [
      "The native input type, such as email, password, or file.",
      "The controlled value or initial uncontrolled value.",
      "A short example that helps communicate the expected value format.",
      "Sets native input constraints.",
      "Enables the error border and focus ring.",
    ],
    accessibility: [
      "Connect Label htmlFor to the Input id, or provide an aria-label.",
      "A placeholder does not replace Label and should only provide an example of the expected format.",
      "For errors, set aria-invalid and connect the error message id with aria-describedby.",
    ],
  },
  "input-group": {
    summary:
      "A composable field that groups an input, addons, and actions on one inset surface.",
    description:
      "Combines InputGroupInput or InputGroupTextarea with leading or trailing addons, supporting text, and buttons. The root focus-within state gives the entire group one focus treatment.",
    props: [
      "Arranges controls, addons, text, and buttons in sequence.",
      "Provides an accessible name for the whole role=group when needed.",
      "Native attributes such as id, name, type, value, and onChange.",
      "Native attributes for the multiline control.",
      "The button type for the group action.",
    ],
    accessibility: [
      "The root role=group does not name the input, so connect the control itself to Label.",
      "Hide purely decorative addons with aria-hidden=true, but leave meaningful units and prefixes available to assistive technology.",
      "Provide an aria-label for an icon-only InputGroupButton.",
    ],
  },
  label: {
    summary:
      "A native label that connects a form control name to its click target.",
    description:
      "A thin wrapper around native label that forwards all standard attributes. Provides text color and cursor styles that match the peer-disabled state.",
    props: [
      "The id of the form control to associate.",
      "Text that describes the purpose of the control.",
      "Extends layout and state styles.",
    ],
    accessibility: [
      "htmlFor must exactly match the id of the target control.",
      "To name a group of controls such as RadioGroup, use fieldset and legend or aria-labelledby instead of a standalone Label.",
      "Communicate required state and supporting descriptions with required and aria-describedby as well as visual indicators.",
    ],
  },
  pagination: {
    summary:
      "A set of raised links that identifies the current page and previous or next navigation.",
    description:
      "Composable pagination that preserves the semantics of nav, ul, li, and anchor. Provides an active page, previous and next links, and a collapsed-range indicator.",
    props: [
      "The accessible name of the pagination navigation region.",
      "The actual URL of the target page.",
      "Applies the current-page style and aria-current=page.",
      "Replaces the default navigation label.",
    ],
    accessibility: [
      "Each page should be a link with a real href to preserve browser navigation and opening in a new tab.",
      "Set isActive on exactly one current page to apply aria-current=page.",
      "Previous and Next include default aria-label values; override them when localization is required.",
    ],
  },
  progress: {
    summary:
      "Progress status rendered as a primary fill inside an inset track.",
    description:
      "Uses Base UI Progress progressbar semantics. Normalizes valid max and value values, and exposes an indeterminate state when value is missing or invalid.",
    props: [
      "The current progress value, normalized between 0 and max.",
      "The total range greater than 0; invalid values fall back to 100.",
      "The accessible name of the task in progress.",
      "Creates aria-valuetext when a description beyond the numeric value is needed.",
    ],
    accessibility: [
      "Progress needs an aria-label or aria-labelledby that describes the task, such as File upload.",
      "A visible percentage is not automatically associated with the progressbar, so connect its label explicitly.",
      "A null value represents an indeterminate state and should not be accompanied by completion-percentage text.",
    ],
  },
  "radio-group": {
    summary:
      "A group of native radio inputs for selecting a single value.",
    description:
      "Shares the name and selected state through React context while rendering every item as a real input[type=radio]. Supports controlled and uncontrolled values, horizontal or vertical layout, disabled, and required.",
    props: [
      "The controlled selected value or initial uncontrolled value.",
      "Called when the selected value changes.",
      "Sets the layout direction and aria-orientation.",
      "The native radio name shared by all items.",
      "Sets input constraints for all items.",
      "The value passed to the group when the item is selected.",
    ],
    accessibility: [
      "Give the RadioGroup root an accessible group name with aria-label or aria-labelledby.",
      "Connect each RadioGroupItem id to Label htmlFor.",
      "Real radio inputs preserve native form submission and keyboard selection behavior.",
    ],
  },
  "scroll-area": {
    summary:
      "A themed overflow surface that preserves native browser scrolling.",
    description:
      "Uses overflow-auto and the native scrollbar to preserve wheel, touch, keyboard, and browser accessibility behavior. The ScrollBar export is a hidden placeholder for shadcn composition compatibility.",
    props: [
      "Constrains height or width to create an overflow region.",
      "Provides a keyboard scrolling entry point when no focusable child is present.",
      "Names the content when it is an independently navigable region.",
      "A direction data attribute for the compatibility placeholder.",
    ],
    accessibility: [
      "Native overflow does not intercept screen-reader or touch scrolling behavior.",
      "If the region contains no links or buttons, use tabIndex=0 so keyboard users can enter it.",
      "ScrollBar is a visually hidden compatibility placeholder; the browser scrollbar performs the actual scrolling.",
    ],
  },
  select: {
    summary:
      "A native select surface that preserves browser accessibility.",
    description:
      "Uses native select, optgroup, and option elements with an inset field and decorative chevron. Preserves the platform picker on mobile and native form submission.",
    props: [
      "The controlled selected value or initial uncontrolled value.",
      "Called when the native select value changes.",
      "Sets native select constraints and multiple selection.",
      "The value submitted by the option.",
      "The label for an optgroup of options.",
    ],
    accessibility: [
      "Connect Label htmlFor to the Select id.",
      "When the first option acts as a placeholder, combine an empty value with disabled and retain a real Label.",
      "Because it uses native select, operating-system keyboard and mobile picker behavior is preserved.",
    ],
  },
  separator: {
    summary:
      "A divider that expresses boundaries between related content with light and a fine shadow.",
    description:
      "Supports horizontal and vertical orientations and is decorative by default. For a meaningful section boundary, set decorative=false to expose the separator role and aria-orientation.",
    props: [
      "Sets the divider orientation and size styles.",
      "When true, hides the decorative element; when false, applies role=separator.",
      "Extends spacing, length, and minimum-height styles.",
    ],
    accessibility: [
      "Keep the default decorative=true for a purely visual boundary.",
      "For a structurally meaningful document boundary, use decorative=false to expose role=separator.",
      "A vertical separator requires height from its parent or an explicit height set with className.",
    ],
  },
  skeleton: {
    summary:
      "An inset placeholder that previews the size and position of content while it loads.",
    description:
      "A simple div-based pulse placeholder. It only provides a visual loading shape and is hidden from assistive technology with aria-hidden=true.",
    props: [
      "Sets the placeholder width, height, and radius.",
      "Hides the decorative placeholder from the accessibility tree.",
    ],
    accessibility: [
      "Because Skeleton is aria-hidden, provide a separate sr-only status message or role=status around it.",
      "Set aria-busy=true on the loading region when appropriate, then remove it when loading completes.",
      "The global prefers-reduced-motion rule effectively disables the pulse animation.",
    ],
  },
  slider: {
    summary:
      "A range control for adjusting one or more values on a horizontal or vertical track.",
    description:
      "Built on Base UI Slider with both single-value and number[] range APIs. Creates one thumb per array item, names each input through thumbLabels, and supports horizontal or vertical orientation with controlled or uncontrolled values.",
    props: [
      "The controlled value or initial uncontrolled value for each thumb.",
      "The selectable numeric range.",
      "The increment used for keyboard and pointer adjustment.",
      "Sets the track direction and keyboard axis.",
      "Accessible names passed to the actual thumb inputs in value order.",
      "Provides the array of values while adjustment occurs or when it finishes.",
      "Disables interaction for every thumb.",
    ],
    accessibility: [
      "Name the Slider group with aria-label or aria-labelledby, and pass each control-point name to thumbLabels in value order.",
      "Base UI manages role=slider, current, minimum, and maximum values, plus Arrow, Page, Home, and End key behavior for every thumb.",
      "Provide one thumbLabels entry for a single value, or distinct names such as minimum and maximum for a range.",
    ],
  },
  switch: {
    summary:
      "An on-or-off control that presents immediately applied settings on a pressed track.",
    description:
      "Applies role=switch to a native checkbox input to preserve form and browser behavior. Supports checked, defaultChecked, and onCheckedChange.",
    props: [
      "The controlled on state or initial uncontrolled state.",
      "Called when the on state changes.",
      "Receives the native checkbox change event.",
      "Disables input and pointer interaction.",
      "Native checkbox attributes used for form submission.",
    ],
    accessibility: [
      "Applying role=switch to a real checkbox communicates the checked state to assistive technology and preserves Space key interaction.",
      "Connect Label htmlFor to the Switch id, or provide an aria-label.",
      "Checkbox may be more appropriate for a boolean choice that is not applied immediately and requires a separate save action.",
    ],
  },
  table: {
    summary:
      "A semantic data table that scrolls horizontally on smaller screens.",
    description:
      "Composes native table, caption, thead, tbody, tfoot, tr, th, and td elements. An outer container provides overflow-x-auto and a neumorphic raised surface.",
    props: [
      "Arranges the caption and table sections.",
      "Describes the purpose and data scope of the table.",
      "Specifies the direction of cells described by the header.",
      "Enables the inset state for a selected row.",
      "The native span range for a table cell.",
    ],
    accessibility: [
      "Describe the table purpose with TableCaption, using the sr-only class when it should be visually hidden.",
      "Set scope on column and row headers according to their meaning.",
      "Do not use Table solely for layout; use CSS grid or flex instead.",
    ],
  },
  tabs: {
    summary:
      "A tab interface for keyboard switching between panels in the same context.",
    description:
      "Built on Base UI Tabs with the active trigger rendered as a raised surface and the list as an inset track. Supports controlled and uncontrolled values, automatic or manual activation, and horizontal or vertical orientation.",
    props: [
      "The controlled active tab value or initial uncontrolled value.",
      "Called when the active tab changes.",
      "Sets the list orientation and Arrow key navigation axis.",
      "Determines whether moving focus with Arrow keys also activates the panel.",
      "A unique value shared with the associated TabsContent.",
      "The trigger value that opens the panel.",
    ],
    accessibility: [
      "Name the tab group on TabsList with aria-label or aria-labelledby.",
      "Base UI manages tab, tablist, and tabpanel roles and the aria-controls and aria-selected relationships.",
      "Use activateOnFocus on TabsList only when panel switching is immediate.",
    ],
  },
  textarea: {
    summary:
      "A resizable inset field for entering multiline text.",
    description:
      "Forwards every native textarea attribute while styling minimum height, vertical resizing, focus, and aria-invalid states with neumorphic tokens.",
    props: [
      "The controlled text or initial uncontrolled text.",
      "The initial number of visible rows.",
      "A short example that helps communicate the expected input format.",
      "Sets native input constraints.",
      "Enables the error border and focus ring.",
    ],
    accessibility: [
      "Connect Label htmlFor to the Textarea id, and do not replace Label with a placeholder.",
      "When enforcing a character limit, provide maxLength and the current character count, connecting them with aria-describedby when needed.",
      "Give the error message an id and connect it to the control with aria-invalid and aria-describedby.",
    ],
  },
  tooltip: {
    summary:
      "A popup that provides a short supporting description on hover and keyboard focus.",
    description:
      "Built on Base UI Tooltip by composing Provider, Root, Trigger, Portal, Positioner, and Popup. The default provider delay is 250ms, and the popup automatically avoids collisions around the trigger.",
    props: [
      "The delay in milliseconds before opening the tooltip after pointer hover.",
      "The controlled open state or initial uncontrolled open state.",
      "Called when the open state changes.",
      "Composes tooltip trigger behavior onto a button or link.",
      "Positions the popup relative to the trigger.",
      "The distance between the trigger and popup.",
    ],
    accessibility: [
      "Tooltip does not replace the accessible name of its trigger, so icon buttons still need an aria-label.",
      "Keep the content brief and supplementary; do not place essential instructions or error messages only in Tooltip.",
      "Base UI opens Tooltip on keyboard focus as well as hover and closes it with Escape.",
    ],
  },
"alert-dialog": {"summary":"An explicit confirmation for an irreversible action.","description":"An explicit confirmation for an irreversible action. Place Cancel first. For asynchronous work, close a controlled dialog only after success.","props":["Set controlled or initial state.","Choose the focus target when opening.","Handle a synchronous confirmation; use controlled state for asynchronous work."],"accessibility":["Place Cancel first. For asynchronous work, close a controlled dialog only after success.","Preserve labels and visible focus when customizing render or className."]},
"popover": {"summary":"An anchored panel for contextual settings.","description":"An anchored panel for contextual settings. Provide a PopoverTitle and description, and check keyboard dismissal.","props":["Set controlled or initial state.","Set panel placement or spacing with viewport collision handling.","Compose an existing element, its events, and ref."],"accessibility":["Provide a PopoverTitle and description, and check keyboard dismissal.","Preserve labels and visible focus when customizing render or className."]},
"hover-card": {"summary":"A supplemental preview of a link destination.","description":"A supplemental preview of a link destination. Do not hide essential content or actions behind hover. The original link must remain meaningful.","props":["Set controlled or initial state.","Opening and closing delay in milliseconds.","Set panel placement or spacing with viewport collision handling."],"accessibility":["Do not hide essential content or actions behind hover. The original link must remain meaningful.","Preserve labels and visible focus when customizing render or className."]},
"sheet": {"summary":"A scrollable task panel attached to a viewport edge.","description":"A scrollable task panel attached to a viewport edge. Include SheetTitle and a description. Keep dismissal and the final field reachable on small screens.","props":["Set panel placement or spacing with viewport collision handling.","Accessible name of the close button.","Set controlled or initial state."],"accessibility":["Include SheetTitle and a description. Keep dismissal and the final field reachable on small screens.","Preserve labels and visible focus when customizing render or className."]},
"collapsible": {"summary":"Reveal or hide one group of optional settings.","description":"Reveal or hide one group of optional settings. Name the trigger for its content. Check expansion with Enter and Space.","props":["Set controlled or initial state.","Disable user interaction.","Keep the panel mounted while closed."],"accessibility":["Name the trigger for its content. Check expansion with Enter and Space.","Preserve labels and visible focus when customizing render or className."]},
"toggle": {"summary":"A standalone button with a persistent pressed state.","description":"A standalone button with a persistent pressed state. Label icon-only buttons. Selection also uses an inset surface and border, not color alone.","props":["Set controlled or initial state.","Choose the control size.","Disable user interaction."],"accessibility":["Label icon-only buttons. Selection also uses an inset surface and border, not color alone.","Preserve labels and visible focus when customizing render or className."]},
"toggle-group": {"summary":"A keyboard-navigable group of single or multiple selections.","description":"A keyboard-navigable group of single or multiple selections. Label the group and every item. Distinguish arrow-key focus movement from selection.","props":["Set controlled or initial state.","Allow multiple selected items.","Set layout and keyboard-navigation orientation."],"accessibility":["Label the group and every item. Distinguish arrow-key focus movement from selection.","Preserve labels and visible focus when customizing render or className."]},
"toolbar": {"summary":"An arrow-key-navigable set of document actions.","description":"An arrow-key-navigable set of document actions. Name the Toolbar. Disabled items remain arrow-key focusable but cannot activate. Set focusableWhenDisabled={false} to exclude them from navigation.","props":["Set layout and keyboard-navigation orientation.","Loop keyboard focus at the ends.","Disable user interaction."],"accessibility":["Name the Toolbar. Disabled items remain arrow-key focusable but cannot activate. Set focusableWhenDisabled={false} to exclude them from navigation.","Preserve labels and visible focus when customizing render or className."]},
"field": {"summary":"Connect a control with its label, description, and validation errors.","description":"Connect a control with its label, description, and validation errors. Use FieldControl or compose it through render. Provide FieldError text as well as an error color.","props":["Field key for form values and external errors.","Return a custom validation result.","Choose when validation runs."],"accessibility":["Use FieldControl or compose it through render. Provide FieldError text as well as an error color.","Preserve labels and visible focus when customizing render or className."]},
"fieldset": {"summary":"Group related controls under a shared legend and disabled state.","description":"Group related controls under a shared legend and disabled state. Describe the group with FieldsetLegend and retain labels on individual controls.","props":["Disable user interaction.","Name the group of related fields.","Extend styling, optionally with a state callback."],"accessibility":["Describe the group with FieldsetLegend and retain labels on individual controls.","Preserve labels and visible focus when customizing render or className."]},
"form": {"summary":"A native form coordinating field validation and submission errors.","description":"A native form coordinating field validation and submission errors. Separate save and reset actions. The demo updates local state; server persistence is not included.","props":["Receive validated form values; native submission is prevented.","Associate external errors with field names.","Choose when validation runs."],"accessibility":["Separate save and reset actions. The demo updates local state; server persistence is not included.","Preserve labels and visible focus when customizing render or className."]},
"number-field": {"summary":"Numeric entry with bounds, steps, and locale-aware formatting.","description":"Numeric entry with bounds, steps, and locale-aware formatting. Name each increment/decrement button. Check boundaries and direct text input.","props":["Set the minimum and maximum bounds.","Increment size for buttons and keyboard input.","Configure locale-aware number formatting."],"accessibility":["Name each increment/decrement button. Check boundaries and direct text input.","Preserve labels and visible focus when customizing render or className."]},
"meter": {"summary":"Represent a measurement within a known range.","description":"Represent a measurement within a known range. Use Progress for task completion. Pair MeterLabel with a visible numeric value.","props":["Current measurement within the range.","Set the minimum and maximum bounds.","Configure locale-aware number formatting."],"accessibility":["Use Progress for task completion. Pair MeterLabel with a visible numeric value.","Preserve labels and visible focus when customizing render or className."]},
"combobox": {"summary":"Searchable selection with filtering, empty results, and keyboard interaction.","description":"Searchable selection with filtering, empty results, and keyboard interaction. Provide ComboboxLabel and an empty-result message. Check arrows, Enter, Escape, and real IME input.","props":["Source items available for filtering and selection.","Set controlled or initial state.","Allow multiple selected items."],"accessibility":["Provide ComboboxLabel and an empty-result message. Check arrows, Enter, Escape, and real IME input.","Preserve labels and visible focus when customizing render or className."]},"calendar": {"summary":"A neumorphic calendar for single dates and ranges.","description":"Uses DayPicker v10 date calculations and keyboard navigation. Selected endpoints are inset; range interiors form a continuous surface. No legacy prop aliases are added.","props":["Choose the selection mode.","Connect selection state and its change callback.","Set disabled dates, locale and navigable month bounds."],"accessibility":["Use arrow keys to move between dates and Enter or Space to select.","Retain the library's accessible labels for endpoints, today and disabled dates."]},
"date-picker": {"summary":"Choose and clear a date in a focused popover.","description":"A controlled picker. With name set, a hidden input submits a local YYYY-MM-DD date instead of converting through UTC. The example handles form reset by updating parent state.","props":["Current date and change callback. The empty value is undefined.","Accessible trigger name, form field name and description element ID.","Disabled dates and bounds for month navigation."],"accessibility":["Opening focuses the calendar; closing restores trigger focus.","Validate required values in the parent form. Connect errors with invalid and describedBy; a hidden input is not native required-field validation."]},
"data-table": {"summary":"Compose search, filters, sorting, row selection and pagination.","description":"The caller's TanStack Table instance owns data and state; these components render it. The illustrative example uses stable row IDs to retain selection across filtering and pages.","props":["The TanStack Table instance containing row models and state.","Table caption, empty-result text and a composed search/filter toolbar.","Localize navigation and page counts, and choose page sizes."],"accessibility":["Includes a caption, aria-sort on sortable headers and a keyboard-focusable scrolling region.","Distinguish current-page selection from the total selected count. Server pagination requires caller-managed selection state."]},
"toast": {"summary":"Notifications with result messages and undo actions.","description":"Uses the existing Base UI Toast lifecycle and accessibility behavior. The local example shows success, error, undo and timed dismissal without claiming server persistence.","props":["Lifetime, visible limit and an optional external manager. timeout 0 disables automatic dismissal.","Create, close, update and track asynchronous toast states.","Accessible names for the notification region and close buttons."],"accessibility":["F6 enters the notification region. Communicate results through titles and descriptions, not color alone.","Keep critical recovery actions available outside transient messages. The example keeps notifications open for inspection unless a timeout is explicitly set."]},

});

export default componentDocCopyEn;
