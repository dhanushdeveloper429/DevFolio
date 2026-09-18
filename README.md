Option 1 — Four separate rules/documents

* Keep the four Late Notification rules as four separate backend entries.
* Each has the same label: Late Notification.
* Give them a sequence/order, e.g. 1–4.
* In the UI, show all four entries.
* Sort by label so the four Late Notification entries appear together.
* This is the simplest implementation if business is comfortable seeing four entries.

Option 2 — One label with multiple expressions

* Backend can still keep the four rules separately.
* UI groups them under one Late Notification label.
* The four expressions appear underneath that label as sub-entries.
* The service can retrieve the rules by label and flatten them when executing.

