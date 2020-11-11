create table names(
	id serial not null primary key,
	names varchar(32)
);

create table days(
	id serial not null primary key,
	days varchar(32)
);

create table days_availability(
	names_id int not null,
	days_id int not null,
	foreign key (names_id) references names(id)
	foreign key (days_id) references days (id)
);

insert into days(days) values ('Sunday');
insert into days(days) values ('Monday');
insert into days(days) values ('Tuesday');
insert into days(days) values ('Wednesday');
insert into days(days) values ('Thursday');
insert into days(days) values ('Friday');
insert into days(days) values ('Saturday');

