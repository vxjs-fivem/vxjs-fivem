import { ServiceCollection, Inject } from '@vxjs-fivem/core/src';

describe('Container Test', () => {
  it('should contain a service', function () {
    const tag = 'service tag';
    class T {}

    const container = new ServiceCollection();
    container.add(tag, T);
    const has = container.build().has(tag);

    expect(has).toBe(true);
  });

  it('should resolve a class', function () {
    const tag = 'class tag';
    class T {}

    const container = new ServiceCollection();
    container.add(tag, T);
    const resolved = container.build().get<T>(tag);

    expect(resolved).toBeInstanceOf(T);
  });

  it('should resolve an instance', function () {
    const tag = 'instance tag';
    class T {}

    const container = new ServiceCollection();
    const instance = new T();

    container.add(tag, instance);

    const resolved = container.build().get<T>(tag);

    expect(resolved).toBeInstanceOf(T);
    expect(instance).toBe(resolved);
    expect(instance === resolved).toBe(true);
  });

  it('should resolve a factory (arrow fn)', function () {
    const tag = 'arrow fn tag';
    class T {}

    const container = new ServiceCollection();
    container.addFactory(tag, () => new T());
    const resolved = container.build().get<T>(tag);

    expect(resolved).toBeInstanceOf(T);
  });

  it('should resolve a dependency from factory (property) to two different parents', function () {
    const parentTag1 = 'parentTag1';
    const parentTag2 = 'parentTag2';
    const childTag = 'childTag';

    class Child {
      public readonly parentName: string;
      public constructor(parentName: string) {
        this.parentName = parentName;
      }
    }

    class Parent1 {
      @Inject(childTag)
      public child: Child;
    }

    class Parent2 {
      @Inject(childTag)
      public child: Child;
    }

    const container = new ServiceCollection();
    container.add(parentTag1, Parent1);
    container.add(parentTag2, Parent2);

    container.addFactory(childTag, (_, target) => {
      return new Child(target.name);
    });

    const parent1 = container.build().get<Parent1>(parentTag1);
    const parent2 = container.build().get<Parent1>(parentTag2);

    expect(parent1.child).toBeInstanceOf(Child);
    expect(parent2.child).toBeInstanceOf(Child);
    expect(parent1.child.parentName).toBe(Parent1.name);
    expect(parent2.child.parentName).toBe(Parent2.name);
  });
});
