import { Injectable } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class MediaQueriesService {
    private aliasSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(
        'lg'
    );

    private isMobileSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    private isMobileXsSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    private isDesktopSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    private isTabletSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    alias$: Observable<string> = this.aliasSubject$.asObservable();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isMobile$: Observable<boolean> = this.isMobileSubject$.asObservable();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isTablet$: Observable<boolean> = this.isTabletSubject$.asObservable();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isDesktopMd$: Observable<boolean> = this.isDesktopSubject$.asObservable();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isMobileXs$: Observable<boolean> = this.isMobileXsSubject$.asObservable();

    constructor(private observerMedia: MediaObserver) {
        this.watch();
    }

    watch() {
        this.observerMedia
            .asObservable()
            .pipe(
                filter(
                    (changes: MediaChange[]) => changes.length > 0
                ),
                map((changes: MediaChange[]) => changes[0])
            )
            .subscribe((change: MediaChange) => {
                const alias = change.mqAlias;

                this.aliasSubject$.next(alias);

                switch (alias) {
                    case 'xs':
                        this.isMobileSubject$.next(true);
                        this.isMobileXsSubject$.next(true);
                        this.isTabletSubject$.next(false);
                        this.isDesktopSubject$.next(false);
                        break;
                    case 'sm':
                        this.isMobileSubject$.next(true);
                        this.isMobileXsSubject$.next(false);
                        this.isTabletSubject$.next(false);
                        this.isDesktopSubject$.next(false);
                        break;
                    case 'md':
                        this.isMobileSubject$.next(false);
                        this.isMobileXsSubject$.next(false);
                        this.isTabletSubject$.next(true);
                        this.isDesktopSubject$.next(false);
                        break;
                    default:
                        this.isMobileSubject$.next(false);
                        this.isMobileXsSubject$.next(false);
                        this.isTabletSubject$.next(false);
                        this.isDesktopSubject$.next(true);
                        break;
                }
            });
    }
}
