describe('Mediator', () => {
    let mediator;
    let testData;

    beforeEach(() => {
        mediator = new Mediator();

        testData = {
            event: 'Some event',
            callback: () => {
            },
        }
    });


    describe('Methods', () => {
        describe('constructor', () => {
            it('creates new empty channels object', () => {
                expect(mediator.channels).toEqual({});
            });
        });

        describe('subscribe(event, callback)', () => {
            it('creates some event', () => {
                mediator.subscribe(testData.event, testData.callback);
                expect(mediator.channels[testData.event]).toEqual(jasmine.arrayContaining([testData.callback]));
                expect(typeof testData.callback).toBe('function');
            });
            it('can be called in a chain', () => {
                expect(mediator.subscribe(testData.event, testData.callback)).toBe(mediator);
            });
            it('call with incorrect arguments', () => {
                mediator.subscribe();
                expect(mediator.channels).toEqual({});
            });
        });

        describe('unsubscribe(event, [callback])', () => {
            it('deleting event listeners', () => {
                mediator.subscribe(testData.event, testData.callback);
                mediator.subscribe(testData.event, testData.callback);

                mediator.unsubscribe(testData.event, testData.callback);

                expect(mediator.channels[testData.event]).toEqual([]);
            });

            it('deleting all event listeners', () => {
                for (let i = 0; i < 10; i++) {
                    mediator.subscribe(testData.event, testData.callback);
                }

                mediator.unsubscribe(testData.event);

                expect(mediator.channels[testData.event]).toEqual([]);

            });

            it('can be called in a chain', () => {
                expect(mediator.unsubscribe(testData.event, testData.callback)).toBe(mediator);
            });

            it('does not throw exceptions with incorrect arguments', () => {
                expect(() => {
                    mediator.unsubscribe();
                }).not.toThrowError();
            });
        });

        describe('publish(event, [data])', () => {
            it('call all listeners', () => {
                const eventData = {
                    a: 10,
                };

                spyOn(testData, 'callback');

                for (let i = 0; i < 10; i++) {
                    mediator.subscribe(testData.event, testData.callback);
                }

                mediator.publish(testData.event, eventData);

                expect(testData.callback).toHaveBeenCalledTimes(10);
                expect(testData.callback).toHaveBeenCalledWith(testData.event, eventData);

            });

            it('can be called in a chain', () => {
                const eventData = {
                    a: 10,
                };
                expect(mediator.publish(testData.event, eventData)).toBe(mediator);
            });
        });
    });
});