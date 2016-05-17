'use strict';

var expect = require('chai').expect;
var crawl = require('../lib/crawler').crawl;
var httpbinHost = 'localhost:8000';

describe('crawl', function() {
    it('should run the first readme example with the promise way', function(done) {
        crawl('http://' + httpbinHost, {
            maxConnections: 10
        }).then(function(response) {
            expect(response.statusCode).to.equal(200);
            expect(typeof response.body).to.equal('string');
            done();
        });
    });
});
