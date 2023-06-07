import { NgModule } from '@angular/core';
import { SearchInputModule } from '../../shared/search-input/search-input.module';
import { SharedModule } from '../../shared/shared.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { UsersApi } from './users.api';
import { UsersRoutingModule } from './users.routing';
import { UsersService } from './users.service';

const components = [UsersPageComponent, UserDetailsComponent];
const providers = [UsersService, UsersApi];
const modules = [SharedModule, UsersRoutingModule, SearchInputModule];

@NgModule({
  declarations: [...components],
  providers: [...providers],
  imports: [...modules],
})
export class UsersModule {}
