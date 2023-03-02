import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from '@app/_models';
import { AlertService } from '@app/_services';

@Component({ selector: 'alert', templateUrl: 'alert.component.html' })
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(private router: Router, private alertService: AlertService) {}

  ngOnInit() {
    // Suscripción a una nueva notificación de alerta
    this.alertSubscription = this.alertService
      .onAlert(this.id)
      .subscribe((alert) => {
        // Se limpian las alertas cuando se recibe una alerta vacía.
        if (!alert.message) {
          // Se excluyen las alertas sin la etiqueta 'keepAfterRouteChange'
          this.alerts = this.alerts.filter((x) => x.keepAfterRouteChange);

          // Se elimina la etiqueta 'keepAfterRouteChange' en el resto
          this.alerts.forEach((x) => delete x.keepAfterRouteChange);
          return;
        }

        // Se añade la alerta al array
        this.alerts.push(alert);

        // Cierre automático de la alerta si es necesario
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });

    // Limpieza de las alertas en caso de que se cambie la ruta.
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy() {
    // Desuscripción de las alertas en caso de leaks en memoria.
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    // Se comprueba si ya ha sido eliminada la alerta para prevenir el error en autocierre.
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      // Aplicación de fade a la alerta.
      alert.fade = true;

      // Se elimina la alerta después de aplicarle fade.
      setTimeout(() => {
        this.alerts = this.alerts.filter((x) => x !== alert);
      }, 250);
    } else {
      // Eliminación de la alerta.
      this.alerts = this.alerts.filter((x) => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissible', 'mt-4', 'container'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert-success',
      [AlertType.Error]: 'alert-danger',
      [AlertType.Info]: 'alert-info',
      [AlertType.Warning]: 'alert-warning',
    };

    if (alert.type !== undefined) {
      classes.push(alertTypeClass[alert.type]);
    }

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }
}
