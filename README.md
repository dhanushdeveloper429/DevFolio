For the holiday implementation, we propose the following rules for confirmation:

For offsetType = DAY, the configured offsetValue will determine the number of calendar days to move:
Positive value → move forward (e.g., +1 = next day, +2 = two days forward)
Negative value → move backward (e.g., -1 = previous day, -2 = two days backward)
If a holiday falls on Saturday or Sunday, the observed holiday will be Monday.
Please provide the approved holiday calendar for 2027 (and confirm how many future years need to be maintained), so we can load the dates into the system rather than manually determining them.
Please also confirm the expected processing order when an offset results in a weekend date—for example, whether the offset should be applied first and then the weekend rule, or vice versa.

Once these rules and the 2027 holiday list are confirmed, we can proceed with implementation and UAT testing.
