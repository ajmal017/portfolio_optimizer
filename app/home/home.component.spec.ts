import {
    it,
    expect,
    beforeEachProviders,
    injectAsync,
    describe,
    TestComponentBuilder,
    MockApplicationRef
} from 'angular2/testing';
import {
    APP_BASE_HREF,
    ROUTER_PRIMARY_COMPONENT,
    ROUTER_PROVIDERS
} from 'angular2/router';
import { Component, provide, ApplicationRef } from 'angular2/core';
import { HomeComponent } from './home.component';
import { LoggerService } from '../blocks/logger.service';

@Component({
    selector: 'test',
    templateUrl: 'app/home/home.html',
    directives: [HomeComponent]
})
class TestComponent {
}

describe('HomeComponent', () => {
    beforeEachProviders(() => [
        LoggerService,
        ROUTER_PROVIDERS,
        provide(ROUTER_PRIMARY_COMPONENT, { useValue: HomeComponent }),
        provide(ApplicationRef, { useClass: MockApplicationRef }),
        provide(APP_BASE_HREF, { useValue: '/' }),
    ]);

    it('should have a user input component', injectAsync([TestComponentBuilder],
        (tsb: TestComponentBuilder) => {
            return tsb.createAsync(TestComponent).then((fixture) => {
              fixture.detectChanges();
              let compiled = fixture.debugElement.nativeElement;
              expect(compiled).toBeDefined();
              expect(compiled.querySelector('user-input'))
                .not.toBeNull();
            });
        }));

    it('should have a barchart component', injectAsync([TestComponentBuilder],
        (tsb: TestComponentBuilder) => {
            return tsb.createAsync(TestComponent).then((fixture) => {
              fixture.detectChanges();
              let compiled = fixture.debugElement.nativeElement;
              expect(compiled).toBeDefined();
              expect(compiled.querySelector('barchart'))
                .not.toBeNull();
            });
        }));
});