
# Form Builder
## [Live](https://form-builderx2.herokuapp.com/preview)

The application consists of 3 views:
* generating the form
* preview of the form
* and the results of the form

The progress of generating the form and is saved in the indexeddb database. The preview view is only used to complete the form and save the data, changes are not saved here, after the card has been closed, the changes will be lost. The data from the last view is also saved to the database. In addition, the app does not include the question without content in the preview and should validate the data, both during the construction and when using the form.

If you want to run the project locally, simply install the packages using yarn installl and run ng serve --open.