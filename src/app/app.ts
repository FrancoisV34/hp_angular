import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Characters } from './components/characters/characters';
import { Home } from './core/home/home';
import { Header } from './core/header/header';
import { Staff } from './components/staff/staff';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Characters, Home, Header, Staff],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('hp_angular');
}
