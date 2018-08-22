
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('should be defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have valid URLs', () => {
            for(var i = 0; i < allFeeds.length; i++)
            expect(allFeeds[i].url).toBeTruthy();
        });
        
        


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have valid names', () => {
            for(var i = 0; i < allFeeds.length; i++)
            expect(allFeeds[i].name).toBeTruthy();
        });
    });

    describe('The menu', () => {

        beforeEach(() => {
            body = $('body');
            menuLink = $('.menu-icon-link');
        });

        /* Test that ensures the menu element is
         * hidden by default, by checking for the 'menu-hidden'
         * class on page load
         */

        it('should be hidden by default', () => {
            // Simply check that the body element contains the menu-hidden class by default
            expect(body[0].classList).toContain('menu-hidden');
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * triggers a click event on the menu icon and checks
          * for the 'menu-hidden' class to toggle.
          */

        it('should change visibility when the menu icon is clicked', () => {

            // Simulate a click event on the menu icon and check that the menu-hidden class is removed from the body element
            menuLink.click();
            expect(body[0].classList).not.toContain('menu-hidden');
            
            // Simulate a click event on the menu icon and check that the menu-hidden class is added back to body element
            menuLink.click();
            expect(body[0].classList).toContain('menu-hidden');
        });

    });

    describe('Initial Entries', () => {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        
        beforeEach((done) => {
            // Load our initial feed before testing
            loadFeed(0, () => {
                done();
            });
        });

        it('should be loaded', () => {
            // Find the feed element on the page
            feed = $('.feed')[0];
            // Find the first entry element within the feed element
            firstEntry = $('.feed').find('article.entry')[0];
            expect(firstEntry).toBeDefined();
        });

    });

    describe('New Feed Selection', () => {


        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        let initialFeedContent,
            newFeedContent;

        beforeEach((done) => {
            // Load our initial feed, wait for it to finish, then set our initial variable.
            loadFeed(0, () => {
                initialFeedContent = $('.feed')[0].innerHTML;
                done();
            });
        });

        it('should change the content of the feed', (done) => {
            loadFeed(1, () => {
                // Load our new feed, wait for it to finish, then set our variable for comparison.
                newFeedContent = $('.feed')[0].innerHTML;
                expect(newFeedContent).not.toBe(initialFeedContent);
                done();
            });
        });

    });

}());
