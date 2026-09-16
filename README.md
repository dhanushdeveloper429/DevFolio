Hi Team,

As discussed, below is the consolidated summary of the agreed changes, scope, and next steps.

1. Stories / Scope

Nagose will create two stories:

* Provider Level Changes
* Profile Level Changes

All agreed changes will be captured under these two stories and targeted for the October release.

2. Provider Level Changes

The following will remain at the provider level:

* Late Notification
* Readmit Days
* Effective Termination Date

3. Profile Level Changes

The following will be moved/added at the profile level:

* Late Notification
* Diagnosis Code – new profile-level attribute
* Effective Termination Date – new profile-level field
* ERISA Indicator – optional Yes/No field under Funding Type
* Request Type – optional field with no hierarchy or priority
* Diagnosis Code will follow the same approach as Procedure Code and support comma-separated values.
* Product ID, Group ID, Diagnosis Code, Procedure Code, and other applicable fields will support comma-separated entry instead of requiring individual entries.

For IP, OP, IOP, and PHP, Request Type will remain optional.

4. Proposed Grid

The proposed grid will display:

* Profile Name
* State
* Authorization Type
* Case Type
* Line of Business
* Level of Care
* Type of Service
* Procedure Code

Procedure Code will be included at the grid level to make it easier to identify profiles that are primarily associated with a procedure code.

The remaining details will be available on the Profile Details page, including:

* Product ID
* Group ID
* Procedure Codes
* Days
* Units
* Readmit Days
* Late Notification
* Audit Information
* Other applicable profile details

5. Sorting / Filtering

To make the profile grid easier to use as the number of profiles grows, we will look at adding sorting and filtering functionality consistent with the existing UMD/ACME experience.

The preferred approach is to allow users to filter fields such as State, Authorization Type, Case Type, Line of Business, Level of Care, Type of Service, and Procedure Code, similar to an Excel-style filter.

If the same filtering component is not technically compatible, we will evaluate the most appropriate search/filter approach that provides equivalent functionality.

6. Clone Profile

Clone Profile functionality will not be included in the current October scope.

Since the profiles are expected to have provider/market-specific details and may differ in areas such as level of care, days, units, and other configuration values, the team agreed that manual profile creation is acceptable for the current scope.

If clone functionality becomes necessary for the future Gold Card/Red Card work, it can be considered as part of that separately funded effort and included in the corresponding LOE.

7. Medicaid / Line of Business

Medicaid has been added as a Line of Business in Production. We will confirm that the corresponding requirement is reflected in the profile-level configuration and applicable October changes.

8. Existing / Release Items

* Type of Service still requires the discussed changes.
* Line of Business is currently appended to Production, and the related changes have already been included as part of the September release.
* The remaining agreed changes will be implemented as part of the October release.
* Nothing from the current scope is planned to be pushed beyond October at this time.

9. ICD / Gold Card Auditing

The current implementation validates ICD requests against the applicable profile and determines Gold Card eligibility.

If the request is Gold Card eligible, that eligibility is returned to the Gateway, and the request does not proceed through the normal UMD processing flow. The applicable information is also being captured for auditing purposes.

Nicole will follow up with Amit to confirm how the ICD cases and audit information can be viewed/reported. No additional scope is being added to the current stories for this item.

10. Bulk Operations

The following functionality has also been provided:

* Excel bulk upload
* Multi-select
* Bulk delete
* NPI-specific selection
* Bulk termination based on a specified termination date

Next Steps

* Nagose to create the two stories for Provider Level Changes and Profile Level Changes.
* Team to confirm the final requirements captured above.
* Dhanushka to proceed with the agreed changes based on the confirmed stories.
* Remaining agreed scope will be targeted for the October release.

Please review and let us know if anything is missing or needs to be updated.

Thanks,
Dhanushka