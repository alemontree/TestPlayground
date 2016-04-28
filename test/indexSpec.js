"use strict";
let chai = require("chai");
let expect = require("chai").expect;
let word = require('../index');
let sinon = require('sinon');
let sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Sanitize', function() {
  // beforeEach(function() {
  //   console.log("before!");
  // })

  it('return lower of a string', function() {
    let inputWord = "HELLO WORLD";
    let outputWord = word.sanitize(inputWord);

    expect(outputWord).equal("hello world");
    expect(outputWord).to.not.equal('HELLO WORLD');
    expect(outputWord).to.be.a("string");
    expect(outputWord).to.not.be.a('number');
    expect(outputWord).to.contain('hello');
  })
  it('removes any hiphen', function() {
    let inputWord = "HELLO-WORLD";
    let outputWord = word.sanitize(inputWord);

    expect(outputWord).to.equal('hello world');

  })
})
describe('Tokenize', function() {
  it('returns an array of words', function() {
    let sentence = 'hello world';
    let tokenizedSentence = word.tokenize(sentence);

    expect(tokenizedSentence).to.include.members(['hello', 'world']);
  })
})

/* THIS TEST IS NOT GOOD BECAUSE IT RELIES ON EXTERNAL API EACH TIME */
// describe('Gighub info', function() {
//   it('return repo info from github', function(done) {
//     word.info(function(reply) {
//       // console.log(reply);
//       // console.log(typeof reply);
//       // console.log(reply.language);
//       // console.log(reply.size);

//       expect(reply.language).to.equal('HTML');
//       expect(reply.watchers_count).to.equal(262);

//       done();
//     })
//     console.log("hello!")
//   })
// })

describe('Info Language', function() {
  it('returns language info of the repo', function(done) {
    let ghRepo = {
      'language': 'Assembly'
    };
    let stub = sinon.stub().callsArgWith(0, ghRepo);

    word.infoLang(stub, function(reply) {
      expect(reply).to.equal('Language is Assembly');
      done();
    })
  })
})
