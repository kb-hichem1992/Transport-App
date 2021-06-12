/*==============================================================*/
/* Nom de SGBD :  MySQL 5.0                                     */
/* Date de cr�ation :  09/06/2021 11:51:00                      */
/*==============================================================*/


drop table if exists CANDIDAT;

drop table if exists CENTRE;

drop table if exists CONDUIRE;

drop table if exists FORMATION;

drop table if exists LIGNE;

drop table if exists OFFRE;

drop table if exists OPERATEUR;

drop table if exists PASSE;

drop table if exists PC;

drop table if exists TRAVAIL;

drop table if exists VEHICULE;

/*==============================================================*/
/* Table : CANDIDAT                                             */
/*==============================================================*/
create table CANDIDAT
(
   NUM_INS              varchar(20) not null,
   DATE_INS             date not null,
   NOM_CANDIDAT         char(50) not null,
   PRENOM_CANDIDAT      char(50) not null,
   PRENOM_PERE          varchar(50) not null,
   DATE_NAIS_CANDIDAT   date not null,
   LIEU_NAIS_CANDIDAT   varchar(20) not null,
   NIVEAU_SCOL_CANDIDAT varchar(50),
   ADRESSE_CANDIDAT     varchar(100),
   SEX_CONDIDAT         char(10),
   TYPE_CANDIDAT        varchar(20),
   NUM_PERMIS           varchar(45) not null,
   TYPE_PERMIS          varchar(50),
   CATEGORIE_PERMIS     varchar(50),
   primary key (NUM_INS, DATE_INS, NUM_PERMIS)
);

/*==============================================================*/
/* Table : CENTRE                                               */
/*==============================================================*/
create table CENTRE
(
   NUMERO_AGREMENT      varchar(50) not null,
   NOM_CENTRE           varchar(50),
   SIEGE                varchar(100),
   primary key (NUMERO_AGREMENT)
);

/*==============================================================*/
/* Table : CONDUIRE                                             */
/*==============================================================*/
create table CONDUIRE
(
   NUM_INS              varchar(20) not null,
   DATE_INS             date not null,
   NUM_PERMIS           varchar(45) not null,
   MATRECULE            varchar(10) not null,
   primary key (NUM_INS, DATE_INS, NUM_PERMIS, MATRECULE),
   key FK_CONDUIRE (MATRECULE)
);

/*==============================================================*/
/* Table : FORMATION                                            */
/*==============================================================*/
create table FORMATION
(
   NUMERO_FORMATION     int not null,
   TYPE_FORMATION       varchar(50),
   DEBUT                date,
   FIN                  date,
   primary key (NUMERO_FORMATION)
);

/*==============================================================*/
/* Table : LIGNE                                                */
/*==============================================================*/
create table LIGNE
(
   NUM_LIGNE            varchar(100) not null,
   NOM_OP               char(50) not null,
   TYPE_LIGNE           varchar(50),
   DATE_LIV_LIGNE       date,
   DATE_EXP_LIGNE       date,
   primary key (NUM_LIGNE),
   key FK_AVOIR2 (NOM_OP)
);

/*==============================================================*/
/* Table : OFFRE                                                */
/*==============================================================*/
create table OFFRE
(
   NUMERO_FORMATION     int not null,
   NUMERO_AGREMENT      varchar(50) not null,
   primary key (NUMERO_FORMATION, NUMERO_AGREMENT),
   key FK_OFFRE (NUMERO_AGREMENT)
);

/*==============================================================*/
/* Table : OPERATEUR                                            */
/*==============================================================*/
create table OPERATEUR
(
   NOM_OP               char(50) not null,
   SIEGE_OP             varchar(100),
   primary key (NOM_OP)
);

/*==============================================================*/
/* Table : PASSE                                                */
/*==============================================================*/
create table PASSE
(
   NUM_INS              varchar(20) not null,
   DATE_INS             date not null,
   NUM_PERMIS           varchar(45) not null,
   NUMERO_FORMATION     int not null,
   NOTE                 int,
   REMARQUE             varchar(50),
   BREVET               varchar(45),
   LIV_BREVET           date,
   EXP_BREVET           date,
   GROUPE               int not null,
   primary key (NUM_INS, DATE_INS, NUM_PERMIS, NUMERO_FORMATION),
   key FK_PASSE (NUMERO_FORMATION)
);

/*==============================================================*/
/* Table : PC                                                   */
/*==============================================================*/
create table PC
(
   NUM_PC               varchar(100) not null,
   NOM_OP               char(50) not null,
   DATE_EXP_PC          date,
   DATE_LIV_PC          date,
   primary key (NUM_PC),
   key FK_AVOIR_PERMIS (NOM_OP)
);

/*==============================================================*/
/* Table : TRAVAIL                                              */
/*==============================================================*/
create table TRAVAIL
(
   NUM_INS              varchar(20) not null,
   DATE_INS             date not null,
   NUM_PERMIS           varchar(45) not null,
   NOM_OP               char(50) not null,
   DATE_RECRUT          date not null,
   DATE_FIN             date,
   ETAT                 varchar(10),
   primary key (NUM_INS, DATE_INS, NUM_PERMIS, NOM_OP),
   key FK_TRAVAIL (NOM_OP)
);

/*==============================================================*/
/* Table : VEHICULE                                             */
/*==============================================================*/
create table VEHICULE
(
   MATRECULE            varchar(10) not null,
   NOM_OP               char(50) not null,
   GENRE                varchar(20),
   MARQUE               varchar(20),
   PTC                  numeric(10,3),
   PTAC                 numeric(10,3),
   CU                   numeric(10,3),
   NOMBRE_PLACE         int,
   primary key (MATRECULE),
   key FK_APPARTIENT (NOM_OP)
);

alter table CONDUIRE add constraint FK_CONDUIRE foreign key (MATRECULE)
      references VEHICULE (MATRECULE) on delete restrict on update restrict;

alter table CONDUIRE add constraint FK_CONDUIRE2 foreign key (NUM_INS, DATE_INS, NUM_PERMIS)
      references CANDIDAT (NUM_INS, DATE_INS, NUM_PERMIS) on delete restrict on update restrict;

alter table LIGNE add constraint FK_AVOIR2 foreign key (NOM_OP)
      references OPERATEUR (NOM_OP) on delete restrict on update restrict;

alter table OFFRE add constraint FK_OFFRE foreign key (NUMERO_AGREMENT)
      references CENTRE (NUMERO_AGREMENT) on delete restrict on update restrict;

alter table OFFRE add constraint FK_OFFRE2 foreign key (NUMERO_FORMATION)
      references FORMATION (NUMERO_FORMATION) on delete restrict on update restrict;

alter table PASSE add constraint FK_PASSE foreign key (NUMERO_FORMATION)
      references FORMATION (NUMERO_FORMATION) on delete restrict on update restrict;

alter table PASSE add constraint FK_PASSE2 foreign key (NUM_INS, DATE_INS, NUM_PERMIS)
      references CANDIDAT (NUM_INS, DATE_INS, NUM_PERMIS) on delete restrict on update restrict;

alter table PC add constraint FK_AVOIR_PERMIS foreign key (NOM_OP)
      references OPERATEUR (NOM_OP) on delete restrict on update restrict;

alter table TRAVAIL add constraint FK_TRAVAIL foreign key (NOM_OP)
      references OPERATEUR (NOM_OP) on delete restrict on update restrict;

alter table TRAVAIL add constraint FK_TRAVAIL2 foreign key (NUM_INS, DATE_INS, NUM_PERMIS)
      references CANDIDAT (NUM_INS, DATE_INS, NUM_PERMIS) on delete restrict on update restrict;

alter table VEHICULE add constraint FK_APPARTIENT foreign key (NOM_OP)
      references OPERATEUR (NOM_OP) on delete restrict on update restrict;

