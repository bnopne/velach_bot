const test = require('ava');

const DTO = require('../../src/infrastructure/DTO');


test('test getField()', (t) => {
  const dto = new DTO({ a: 'b' });

  t.is(dto.getField('a'), 'b');
  t.is(dto.getField('b'), null);
});


test('test setField()', (t) => {
  const dto = new DTO({});

  dto.setField('a', 'b');

  t.is(dto.getField('a'), 'b');
});


test('test getNestedDTO()', (t) => {
  class NestedDto extends DTO {
    get test() {
      return this.getField('test');
    }
  }

  const dto = new DTO({ nested: { test: 'test' } });

  t.truthy(dto.getNestedDTO('nested', NestedDto));
  t.truthy(dto.getNestedDTO('nested', NestedDto) instanceof NestedDto);

  t.is(
    (dto.getNestedDTO('nested', NestedDto)).test,
    'test',
  );
});


test('test setNestedDTO()', (t) => {
  class NestedDto extends DTO {
    get test() {
      return this.getField('test');
    }
  }

  const dto = new DTO({});
  const nestedDto = new NestedDto({ test: 'kek' });

  dto.setNestedDTO('nested', nestedDto);

  t.is(dto.getNestedDTO('nested', NestedDto).test, 'kek');
});


test('test getNestedDTOArray()', (t) => {
  class NestedDto extends DTO {
    get test() {
      return this.getField('test');
    }
  }

  const dto = new DTO({
    nested: [
      { test: 'test1' },
      { test: 'test2' },
      { test: 'test3' },
      [
        { test: 'test4' },
        { test: 'test5' },
        { test: 'test6' },
      ],
    ],
  });

  t.truthy(dto.getNestedDTOArray('nested', NestedDto));
  t.truthy(Array.isArray(dto.getNestedDTOArray('nested', NestedDto)));

  const arr = dto.getNestedDTOArray('nested', NestedDto);

  t.is(arr[0].test, 'test1');
  t.is(arr[1].test, 'test2');
  t.is(arr[2].test, 'test3');
  t.is(arr[3][0].test, 'test4');
  t.is(arr[3][1].test, 'test5');
  t.is(arr[3][2].test, 'test6');
});


test('test setNestedDTOArray()', (t) => {
  class NestedDto extends DTO {
    get test() {
      return this.getField('test');
    }
  }

  const dto = new DTO({});

  const dtos = [
    new NestedDto({ test: 'test1' }),
    new NestedDto({ test: 'test2' }),
    new NestedDto({ test: 'test3' }),
    [
      new NestedDto({ test: 'test4' }),
      new NestedDto({ test: 'test5' }),
      new NestedDto({ test: 'test6' }),
    ],
  ];

  dto.setNestedDTOArray('nested', dtos);

  const arr = dto.getNestedDTOArray('nested', NestedDto);

  t.is(arr[0].test, 'test1');
  t.is(arr[1].test, 'test2');
  t.is(arr[2].test, 'test3');
  t.is(arr[3][0].test, 'test4');
  t.is(arr[3][1].test, 'test5');
  t.is(arr[3][2].test, 'test6');
});
