import { Injectable, OnDestroy } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
})
export class SeoService implements OnDestroy {
    private _subscription = new Subscription();
    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _title: Title,
        private _meta: Meta,
    ) {}

    initSeoMetaTags(): void {
        this._subscription.add(
            this._router.events
                .subscribe((payload) => {
                    console.log('aqui', payload);
                    this.generateTags();
                })
        );
    }

    generateTags(): void {
        const config: MetaDefinition = {
            title: 'Pyn Pon',
            description: 'this._translate',
            image: 'https://storage.googleapis.com/waykka/p2pOffer-chat/YiFldlnZiIXRx4t1iO1Xsm8aub5Bw3.png',
            slug: `https://themovieandtvserie.netlify.app/`,
        };

        this._title.setTitle(config['title']);

        this._meta.updateTag({
            name: 'description',
            content: config['description'],
        });

        this._meta.updateTag({
            property: 'og:site_name',
            content: 'Pyn Pon',
        });
        this._meta.updateTag({
            property: 'og:title',
            content: 'config.title',
        });
        this._meta.updateTag({
            property: 'og:description',
            content: 'config.description',
        });
        this._meta.updateTag({
            property: 'og:image',
            content: config['image'],
        });
        this._meta.updateTag({
            property: 'og:url',
            content: config['slug'],
        });
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}