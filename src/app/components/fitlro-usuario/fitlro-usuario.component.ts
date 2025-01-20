import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-fitlro-usuario',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './fitlro-usuario.component.html',
  styleUrl: './fitlro-usuario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class FitlroUsuarioComponent {

}
