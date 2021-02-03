import {Subscription} from 'rxjs';

export class SubscriptionsContainer{
    private subs = [];

    set add(s: Subscription){
        this.subs.push(s);
    }

    // tslint:disable-next-line: typedef
    dispose(){
        this.subs.forEach(s => s.unsubscribe());
    }
}
