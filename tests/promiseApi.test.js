'use strict';

var expect = require('chai').expect;
var crawl = require('../lib/crawler').crawl;
var instancePool = require('../lib/crawler').instancePool;
var httpbinHost = 'localhost:8000';

describe('crawl', function() {
    beforeEach(function() {
        instancePool.clear();
    });
    it('should run the first readme example with the promise way', function(done) {
        crawl('http://' + httpbinHost, {
            maxConnections: 1
        }).then(function(response) {
            expect(response.statusCode).to.equal(200);
            expect(typeof response.body).to.equal('string');
            done();
        });
    });
    it('should use the same Crawler object if the options objects are same', function(done) {
        crawl('http://' + httpbinHost, {
            maxConnections: 2
        }).then(function(response) {
            expect(response.statusCode).to.equal(200);
            return crawl('http://' + httpbinHost, {
                maxConnections: 2
            });
        }).then(function(response) {
            expect(response.statusCode).to.equal(200);
            expect(instancePool.size()).to.equal(1);
            done();
        }).catch(done);
    });
    it('should use the different Crawler object if the options objects are different', function(done) {
        crawl('http://' + httpbinHost, {
            maxConnections: 3
        }).then(function(response) {
            expect(response.statusCode).to.equal(200);
            return crawl('http://' + httpbinHost, {
                maxConnections: 4
            });
        }).then(function(response) {
            expect(response.statusCode).to.equal(200);
            expect(instancePool.size()).to.equal(2);
            done();
        }).catch(done);
    });
});
