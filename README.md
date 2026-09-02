Offset. Then we will fully consider that day as a holiday, okay, that we can mention. And then third, we can say Thanksgiving, where the offset is day with the particular value. We will consider the next day as a holiday. Okay. So it's actually not there, one thing is there, the initial thing. In the earlier chat that you were showing, I saw somewhere where it's mentioned, like the offset value is minus one. You are going back one day, or if it is like, say it's one, okay. But what if they put two? The code should be handling it that way, right? Otherwise it doesn't make sense. Not Saturday, Sundays. Offset value is a numeric field. Okay. So if it is a value one means, see, if they just want to blindly give one day only, there is even no need for the offset value field. You just based on the offset day be as day, you can just give one day. Okay. But they explicitly defined offset value, because if offset value is one, then you want to give one day off. But if they put offset value as two, you need to give two days off. And also if you see, they are saying if you put it as negative number, then we have to give before current date to be considered as holiday. That is like if Thursday, Jan 4th, they put as this thing, and if they put minus one day and minus one, then actually you have to give Jan 3rd as holiday. No, no, say that is for the weekend. Okay. See, here if you see, right, Indu has said if holiday comes on Saturday, they are taking Friday, okay, and if it comes on Sunday, they are taking Monday. So this is what Indu has said. But you said Vikram said, that's not true. He is taking forward, right. So that is discrepancy, like ACMP said they are saying different thing. Okay, so we have to be very careful on that. So that's why, like when we are putting, right, we have to explicitly say if the weekend holiday comes on Saturday or Sunday, we are taking Monday as holiday. Okay. We have to explicitly say that Saturday or Sunday we consider as Monday. Otherwise it would be a problem. And then later, if issue comes, we can then point out Vikram said, gave that information. Okay, but at least we have to mention that because of, we mention here itself. So that they can't say that we didn't communicate that. Okay. So that is weekend. Now coming to offset value, if you see, she is explicitly saying, like based on the number of days, it's either forward or backward. Okay. Based on whether it's one or minus one. It's forward or backward. And anyway, if you put one, you are expecting one day. If you put two, naturally it will be two days, right? So that there is no change. Only thing is whether one or three, but with negative, we go backward or this thing. So Vikram say anything on that, like about going forward or backward? Even for day? That is same for day also, fully. Okay. So then let's put that also explicitly like that. That is, we have to mention that if the offset type is day and the value, we will, based on the value, we will consider the next day or the number of days as next future days as off. Okay. We just put that way. So that because whatever Indu is saying is in a different way. Okay. We are trying to achieve the same thing, but the future day or backward day is different in the way Indu has mentioned. And actually what Indu mentioned makes more sense, especially that this thing, the second one, like if it's minus one going back, because there has to be. But practically maybe it's not there in, like in the year, right? Nobody gives, like, previous, but the first one, right? I don't know how they give. I don't know, like for example New Year. If it came on Saturday, do they give Friday? Or if it came on Sunday, do they give Monday? Because if New Year came on Saturday, are they giving Monday? Or is it random? That even I don't know, like how US is determining. No, plus one is if Vikram is giving, you are saying. I am saying, like I don't know whether US government is giving that way. Okay, you understood the point, right? See, I don't know how US government is determining. So, but right now we can implement what Vikram is, but we have to call that now, right? Because tomorrow, like they shouldn't come back saying, like, okay, this year New Year was on Saturday, why you gave on Monday? You should have given on Friday, right? So to avoid that, we can just mention that. So I think with that I think we should be good. Just that scenarios we have to test it out. Yeah. That, okay, that we can't tell, right? Because, see again, this list has to be filled for next year, right? Like how many years forward we are going to put. Are we going to put 2026 and 2027? Okay. Or we are going to put till like five years, or just 2026. Same 2027 also they haven't put here, okay. See, I would suggest you please ask Maha or someone Sate to give the dates from this list. Otherwise we will have to manually check this thing. At least after you explain this, you can request someone to at least get us the dates for 2027. Because, see, what I will say is once, okay, we did the part, we analyzed, we gave the details, right? Now you request Maha or Kavya who is handling this to create the sheet for 2027 and give to us to implement, right? So that can be approved by product also. Rather than us putting in it. Anyway our implementation we can go forward with our understanding, you paste that, you, like let's sync our implementation with that understanding, just that the days, like they can give the Excel, we can insert any time, right, in the DB, so no issue. But let's get a, like a correct list from product. Okay, I think we assume time. But that is like one that thing, right, UAT three sync up. Will you be able to do that? Okay, okay. Yeah, but that rule, just one second, that rule also, right, will other people also have, like Sheet, you or who will be able to execute, or only you will be able, you only familiar with that? No, see, I think because it is GPT, right, C25 execute, I don't think I'll be able to execute for GPT this thing, okay. No, I'm just saying, like, okay, if they need, like, you are not there or something that way, now you are off for a few days. So, saying, okay, if you can familiarize someone else also, just see. Okay, okay. So right now please sync up for UAT three so that I, this thing, and deployment I would send UMT service, and you said, like, other services are deployed, right? Do you have a meaning which all service you have deployed?

Yes — the key points from this discussion can be captured as clear implementation requirements:

Weekend holiday handling
If a holiday falls on Saturday or Sunday, the observed holiday should be Monday.
This should be explicitly documented because there is conflicting guidance about whether Saturday should map to Friday or Monday.
For implementation, proceed with the Monday-observed rule based on the current understanding, and make sure it is documented for Product/UAT approval.
Offset type = Day
The offset value is numeric and determines the number of days.
Positive value → move forward by that many days.
+1 → next day
+2 → two days forward
+3 → three days forward
Negative value → move backward by that many days.
-1 → previous day
-2 → two days backward
The implementation should therefore not hard-code a single-day offset.
Thanksgiving / other holiday offsets
Apply the same offset-value logic consistently wherever the offset is configured.
The configured value determines how many days before/after the holiday are treated as the observed holiday.
Holiday calendar data
Don't manually create the future holiday dates if Product can provide the authoritative list.
Ask Maha/Kavya/Product to provide the holiday sheet/list for 2027 (and clarify how many future years are required).
Once the list is approved, the dates can be inserted into the DB independently of the implementation.
Testing
Explicitly test:
Saturday holiday → Monday
Sunday holiday → Monday
Day offset +1
Day offset +2
Day offset -1
Day offset -2
Include edge cases around year boundaries such as New Year's Day.
UAT/deployment
Sync up for UAT3.
Confirm which services have already been deployed and which remain.
Since the person familiar with the GPT execution may be unavailable for a few days, consider familiarizing another team member with the execution process.

The main thing I would put into the requirement is: “For offset type = Day, the system shall apply the configured numeric offset in the specified direction; positive values move forward and negative values move backward by the corresponding number of calendar days.” This removes the ambiguity around 1 versus 2 versus negative values.

what is the solution here 
Uploaded an image

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


    BH ICD – Legacy Configuration Migration to BH Policy Management UI
2. BH ICD – Legacy Services Migration to BH Policy Management
