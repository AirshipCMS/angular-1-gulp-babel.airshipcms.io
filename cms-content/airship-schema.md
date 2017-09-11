# Airship Schema
Before you can do the Angular Tutorial, complete this tutorial for recreating the Airship Schema for this project.

---

## Login to Airship CMS
In your browser, navigate to `mysite.airshipcms.io/admin` and login with your credentials (_replace "mysite" with your actual site subdomain_).

<img width="916" alt="airship-admin-login" src="https://user-images.githubusercontent.com/1865400/28551593-a1a45e82-7084-11e7-9272-c10b25aedae3.png">  

## Modify the `_root_` page
In the sidebar, click "Pages" then click the <img width="26" alt="wrench" src="https://user-images.githubusercontent.com/1865400/28548077-afe52966-706d-11e7-93f0-ce9e958ec070.png"> Modify Link for the "Homepage".

<img width="236" alt="homepage" src="https://user-images.githubusercontent.com/1865400/28551369-461a3f38-7083-11e7-9a81-f11bd7cd80f1.png">

Check that the layout for the page is set to `application.html` and the template for the page is set to `root.html`.

<img width="683" alt="homepage-page-rendering" src="https://user-images.githubusercontent.com/1865400/28551396-738c3188-7083-11e7-98a4-5d05b7b0b516.png">

Modify the Page Fields:
- Remove the initial page fields from the `Page Fields` section.
- Add a textarea field titled "Description".
- Add a link field titled "Github". 
- Add a textarea field titled "Body". 

<img width="730" alt="homepage-fields" src="https://user-images.githubusercontent.com/1865400/28551419-9acdbd52-7083-11e7-8d57-044e65404628.png">  

Click the Modify Page button.

## Create the `Airship Schema`, `Angular Tutorial`, and `Styling` Pages
- Navigate to `Pages` and click the `New Page` button.
- Enter "Airship Schema" into the Title field.
- The permalink "airship-schema" will generate.

<img width="683" alt="airship-schema" src="https://user-images.githubusercontent.com/1865400/28551616-d3c1d764-7084-11e7-87b2-652de63df8e5.png">  

You don't need to set anything in the `Template Rendering` section, since the contents of the project are all rendered in the single-page application on the root page.

In the `Page Fields` section, add a textarea field titled "Body".

<img width="625" alt="page-field-body" src="https://user-images.githubusercontent.com/1865400/28551639-00242dca-7085-11e7-9cf0-74fa34527306.png">  

Click `Create Page`.
Repeat, for the "Angular Tutorial" and "Styling" pages.

<img width="922" alt="Pages" src="https://airshipcms.io/assets/media/oss-elements/pages-all-angular-1-gulp-babel.png">

## Create the `Elements` Collection
- Navigate to `Collections` and click the `New Collection` button.
- Enter "Elements" in the Title field.
- Refer to a single item in this collection as a(n)... "element".
- The public path "elements" will generate.

<img width="604" alt="elements-collection-setup" src="https://cdn.rawgit.com/AirshipCMS/angular-1.airshipcms.io/d074f23a/assets/Collection%20Setup.png">  

In the `Collection Rendering` section, you'll see `Items Per Page` with `50` as the default value, `Sort Property` with `permalink` as the default value and `Sort Order` with `ascending` as the default value.

<img src="https://cdn.rawgit.com/AirshipCMS/angular-1.airshipcms.io/d074f23a/assets/collection-rendering.png">

`Items Per Page` determines the number of items rendered on the page and must be a number. Change the value to `1000`.

<img src="https://cdn.rawgit.com/AirshipCMS/angular-1.airshipcms.io/d074f23a/assets/items-per-page.png">

`Sort Property` determines what property the items will be sorted by. The avaliable options are `permalink`, `created at`, `published on` and `sorting position`. For this project select `sorting position`.

<img src="https://cdn.rawgit.com/AirshipCMS/angular-1.airshipcms.io/d074f23a/assets/sort-property.png">

`Sort Order` determines the order the items will be sorted. The options are `ascending` and `descending`. Leave the value as `ascending`.

In the `Collection Settings` section, be sure "Show Permalink" is checked.

<img width="720" alt="elements-collection-settings" src="https://user-images.githubusercontent.com/1865400/28551522-30d3c5a8-7084-11e7-9ecf-db23a76f36f0.png">  

In the `Post Fields` section, add a text field titled "Name", an image field titled "Image", and a textarea field titled "Description".

<img width="697" alt="elements-collection-fields" src="https://user-images.githubusercontent.com/1865400/28551551-571e8a4a-7084-11e7-88bc-b9ff2524654d.png">  

Set the Primary Label to "Name".

<img width="359" alt="elements-collection-primary-label" src="https://user-images.githubusercontent.com/1865400/28551566-70836c26-7084-11e7-979e-09429ea071b9.png">  

Click the `Create Collection` button.

## Add some Elements
- In the list view of the Elements Collection, click the `New Item` button.
- Enter the element "Name", "Image" and "Description".
- Click the `Save & Close` button.
- Create a few more elements.

_If you have a local copy of this repository, the graphics for all the elements in this demo are included in a directory outside of compartments._

## Site Settings
You will need to set up a SPA Route so that your Angular Application can load on the _root_ page.

In the Airship admin panel, click the `Settings` located in the sidebar.
<img src="https://cdn.rawgit.com/AirshipCMS/angular-1.airshipcms.io/e4bf7769/assets/settings-link.png">

Click the `Developer` tab.
<img src="https://cdn.rawgit.com/AirshipCMS/angular-1.airshipcms.io/e4bf7769/assets/developer-tab.png">

Click the `Add Route` button in the `Single-Page Application Routes` section.
<img src="https://cdn.rawgit.com/AirshipCMS/angular-1.airshipcms.io/d074f23a/assets/Single-Page-Application-Routes.png">

Leave `/.*` as the value for the `Pattern` field and `/` as the value for the `Destination` field then click `Add`.
<img src="https://cdn.rawgit.com/AirshipCMS/angular-1.airshipcms.io/d074f23a/assets/Add-SPA-Route.png">

<img src="https://cdn.rawgit.com/AirshipCMS/angular-1.airshipcms.io/d074f23a/assets/Added-SPA-Route.png">

## Local Development
Return to the Setup Instructions Step #3 for instructions on developing locally, setting up the Angular project, and deployment.
