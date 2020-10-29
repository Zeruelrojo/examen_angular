import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Presentación
import { InicioComponent } from './Views/inicio/inicio.component';
import { AppComponent } from './Views/Principal/app.component';
import { GetempleadoComponent } from './Views/getempleado/getempleado.component';
import { GetgrupoComponent } from './Views/getgrupo/getgrupo.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'empleados', component: GetempleadoComponent },
  { path: 'grupos', component: GetgrupoComponent },
  { path: '**', component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

export const routingComponents = [AppComponent, InicioComponent, GetempleadoComponent, GetgrupoComponent];