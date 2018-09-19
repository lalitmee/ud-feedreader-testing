/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
    (function() {
        /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
        describe('RSS Feeds', function() {
            /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
            it('are defined', function() {
                expect(allFeeds).toBeDefined();
                expect(allFeeds.length).not.toBe(0);
            });

            /**
             * Test for checking if every feed in allFeeds object contains
             * a URL and it is not empty
             */
            it('are having URL defined and it is not empty', function() {
                allFeeds.forEach(feed => {
                    expect(feed.url).toBeDefined();
                    expect(feed.url).not.toBe('');
                });
            });

            /**
             * Test for checking if every feed in allFeeds object contains
             * a name and it is not empty
             */
            it('are having name defined and it is not empty', function() {
                allFeeds.forEach(feed => {
                    expect(feed.name).toBeDefined();
                    expect(feed.name).not.toBe('');
                });
            });
        });

        /**
         * New Test Suite for "The menu"
         */
        describe('The menu', function() {
            /**
             * Test for checking if the menu element is hidden by default or
             * not by checking the 'menu-hidden' class on body tag
             */
            it('is hidden by default', function() {
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });

            /**
             * Test for checking the visibility of the menu when the menu
             * icon is clicked
             */
            it('changes visibility when menu icon is clicked', function() {
                const hamburger = $('.menu-icon-link');

                hamburger.click();
                expect($('body').hasClass('menu-hidden')).toBe(false);

                hamburger.click();
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });
        });

        /**
         * New test suite for "Initial Entries"
         */
        describe('Initial Entries', function() {
            // beforeEach allows for the use of asynchronous loadFeed().
            beforeEach(function(done) {
                loadFeed(0, function() {
                    done();
                });
            });

            /**
             * Test for checking if there is at least a single feed after the
             * loadFeed() asynchronous request is complete
             */
            it('should be called and contain at least one feed', function() {
                expect($('.feed .entry').length).toBeGreaterThan(0);
            });
        });

        /**
         * New test suite for "New Feed Selection"
         */
        describe('New Feed Selection', function() {
            // tests that new content is loaded by loadFeed().
            let $firstFeed;
            let $secondFeed;

            /**
             * beforeEach function for running the loadFeed() request
             * before every test
             */
            beforeEach(function(done) {
                loadFeed(0, function() {
                    firstFeed = $('.feed').html();
                    done();
                });
            });

            /**
             * Test for checking if the content of the new feed is changing or not
             * after loading the new feed
             */
            it('should change new feed content after loading finshes', function(done) {
                loadFeed(1, function() {
                    secondFeed = $('.feed').html();
                    expect(secondFeed).not.toEqual(firstFeed);
                    done();
                });
            });
        });
    })()
);
