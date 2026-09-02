Uploaded an image
https://chatgpt.com/share/6a98465c-da3c-83ea-a575-4a76389c029f
Sure — phrase it as a real scenario followed by one clear question.

Scenario 1 — Saturday holiday

Scenario: Suppose Independence Day falls on Saturday, July 4.
Question: With OFFSET_DAY = WEEKEND, should the system consider Friday, July 3 or Monday, July 6 as the observed holiday?

Scenario 2 — Sunday holiday

Scenario: Suppose a holiday falls on Sunday.
Question: With OFFSET_DAY = WEEKEND, should the system consider the following Monday as the observed holiday?

Scenario 3 — Positive day offset

Scenario: Suppose Thanksgiving falls on Thursday, November 26, and the configuration has OFFSET_DAY = DAY and OFFSET_VALUE = 2.
Question: Should the system consider Saturday, November 28 as the holiday because the offset is two days forward?

Scenario 4 — Negative day offset

Scenario: Suppose a holiday falls on Thursday, January 4, and the configuration has OFFSET_DAY = DAY and OFFSET_VALUE = -1.
Question: Should the system consider Wednesday, January 3 as the holiday because the offset is one day backward?

Scenario 5 — Offset lands on weekend

Scenario: Suppose a holiday falls on Thursday, with OFFSET_DAY = DAY and OFFSET_VALUE = 2. The resulting date is Saturday.
Question: Should the system keep Saturday, or should the WEEKEND rule move it to Friday/Monday?

Scenario 6 — Offset value means number of days

Scenario: Suppose a holiday falls on Thursday and OFFSET_VALUE = 3.
Question: Does 3 mean we move the holiday three days forward to Sunday, or does it mean three additional holiday days should be created?

I would prioritize Scenario 1, 3, 4, and 5 because those directly clarify the ambiguity discussed in the meeting.

Messages beyond this point are only visible to you

scenario 6 wrong

You're right. Scenario 6 was incorrect because the discussion already establishes that the offset value represents the number of days to move, not the number of holiday days to create.

A better Scenario 6 would be:

Scenario 6 — Offset value of 3
Scenario: Suppose a holiday falls on Thursday, and the configuration has OFFSET_DAY = DAY and OFFSET_VALUE = 3.
Question: Should the system consider Sunday (3 days after Thursday) as the resulting holiday date?

Or, even more directly:

Scenario: If the holiday date is Thursday and OFFSET_VALUE = 3, should the system move the holiday date three days forward to Sunday?

This confirms that the system supports any numeric offset, rather than only +1 or -1.

this is  not possbile no need to ask

Correct. If the system cannot realistically produce a Sunday as a holiday in this configuration, there's no need to ask Scenario 6.

The better questions to confirm are:

Saturday weekend scenario

If a holiday falls on Saturday, should the observed holiday be Friday or Monday?

Sunday weekend scenario

If a holiday falls on Sunday, should the observed holiday be Monday?

Positive offset scenario

If a holiday falls on Thursday and OFFSET_DAY = DAY, OFFSET_VALUE = 1, should the resulting holiday be Friday?

Negative offset scenario

If a holiday falls on Thursday and OFFSET_DAY = DAY, OFFSET_VALUE = -1, should the resulting holiday be Wednesday?

Multiple-day offset scenario

If a holiday falls on Thursday and OFFSET_DAY = DAY, OFFSET_VALUE = 2, should the resulting holiday be Saturday?

Offset + weekend scenario

If a holiday falls on Thursday and OFFSET_VALUE = 2, resulting in Saturday, should the WEEKEND rule then be applied? If yes, should the final observed date be Friday or Monday?

The last question is particularly important, because it determines how DAY and WEEKEND rules interact.

You’re using our basic model. Log in or sign up for more intelligence.
Log in
Sign up for free
