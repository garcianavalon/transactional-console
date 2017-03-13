const assert = require('power-assert');
const sinon = require('sinon');
const transactionalConsole = require('../lib/index');

describe('transactional-console', function() {
  const fakeMessage = {
    'trans_map': {
      'trans_id': 'test-trans-id'
    },
  };

  beforeEach(function () {
      this.sinon = sinon.sandbox.create();
  });

  afterEach(function(){
    this.sinon.restore();
  });

  describe('_getTransactionId', function(){

    it('should extract trans_id correctly', function(done){
      const transId = transactionalConsole._getTransactionId(fakeMessage);
      assert(transId === 'test-trans-id');
      done();
    });

    it('should generate new trans_id for messages with no trans_id', function(done){
      const noTransIdMessage = {
        'trans_map': {}
      };
      const transId = transactionalConsole._getTransactionId(noTransIdMessage);
      assert(transId);
      done();
    });

    it('should generate new trans_id for messages with no trans_map', function(done){
      const noTransMapMessage = {
      };
      const transId = transactionalConsole._getTransactionId(noTransMapMessage);
      assert(transId);
      done();
    });

    it('should generate new trans_id for undefined messages', function(done){
      const transId = transactionalConsole._getTransactionId(undefined);
      assert(transId);
      done();
    });

  });



});
