var fs = require('fs')
	,	join = require('path').join
	, test = require('tape')
	, convert = require('../')
;

test('complex schema', function(assert) {
	var schema
		, result
		, expected
	;

	assert.plan(1);

	schema = getSchema('schema-1.json');
	result = convert(schema);
	expected = getSchema('schema-1-expected.json'); 

	assert.deepEqual(result, expected, 'converted');
});

test('converting complex schema in place', function(assert) {
	var schema
		, result
		, expected
	;

	assert.plan(2);

	schema = getSchema('schema-1.json'); 
	result = convert(schema, {cloneSchema: false});
	expected = getSchema('schema-1-expected.json'); 

	assert.equal(schema, result, 'changed schema in place');
	assert.deepEqual(result, expected, 'converted');
});

function getSchema(file) {
	var path = join(__dirname, 'schemas', file);
	return JSON.parse(fs.readFileSync(path)); 
}
