import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { StudentsModel } from '../../../shared/models/students.model';
import { SuffixPipe } from '../../../shared/pipes/suffix-pipe';

export interface RouteData {
  section: string;
  breadcrumb: string;
}

@Component({
  selector: 'app-students-list',
  imports: [CommonModule, SuffixPipe],
  templateUrl: './students-list.html',
  styleUrl: './students-list.scss',
})
export class StudentsList {
  students = input.required<StudentsModel[]>();
  data = input.required<RouteData>();

  getHouseCount(house: string): number {
    return this.students().filter((student) => student.house === house).length;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getHouseEmoji(house: string): string {
    const emojiMap: { [key: string]: string } = {
      Gryffindor: '🦁',
      Hufflepuff: '🦡',
      Ravenclaw: '🦅',
      Slytherin: '🐍',
    };
    return emojiMap[house] || '🏰';
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
