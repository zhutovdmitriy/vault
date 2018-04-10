import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('adapter:secret-cubbyhole', 'Unit | Adapter | secret-cubbyhole', {
  needs: ['service:auth', 'service:flash-messages'],
});

test('secret api urls', function(assert) {
  let url, method, options;
  let adapter = this.subject({
    ajax: (...args) => {
      [url, method, options] = args;
      return Ember.RSVP.resolve({});
    },
  });

  adapter.query({}, 'secret', { id: '', backend: 'secret' });
  assert.equal(url, '/v1/secret/', 'query generic url OK');
  assert.equal('GET', method, 'query generic method OK');
  assert.deepEqual(options, { data: { list: true } }, 'query generic url OK');

  adapter.queryRecord({}, 'secret', { id: 'foo', backend: 'secret' });
  assert.equal(url, '/v1/secret/foo', 'queryRecord generic url OK');
  assert.equal('GET', method, 'queryRecord generic method OK');
});
