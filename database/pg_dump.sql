--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3 (Debian 14.3-1.pgdg110+1)
-- Dumped by pg_dump version 14.3 (Debian 14.3-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;



CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: ramez.ben.aribia
--

CREATE TABLE public.customers (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    `custmer_name` varchar(45) DEFAULT NULL,
    `customer_field` varchar(45) DEFAULT NULL,
    PRIMARY KEY (`customer_code`)
);


ALTER TABLE public.customers OWNER TO "ramez.ben.aribia";

--
-- Name: products; Type: TABLE; Schema: public; Owner: ramez.ben.aribia
--


CREATE TABLE public.products (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
     description text,
    `product_type` varchar(45) DEFAULT NULL,
    PRIMARY KEY (`product_code`),
     "ownerId" uuid
);


ALTER TABLE public.products OWNER TO "ramez.ben.aribia";

--
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: ramez.ben.aribia
--

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


ALTER TABLE public.typeorm_metadata OWNER TO "ramez.ben.aribia";

--
-- Name: owners; Type: TABLE; Schema: public; Owner: ramez.ben.aribia
--

CREATE TABLE public.owners (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    email character varying NOT NULL,
    "createdOn" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedOn" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.owners OWNER TO "ramez.ben.aribia";

--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: ramez.ben.aribia
--


INSERT INTO public.customers VALUES ('0166fa6b-22f1-4bac-b715-6e878cdece90', 'Ramez Ben Aribia', 'E-Commerce');
INSERT INTO public.customers VALUES ('5ec85af9-ecf2-4a39-b772-5c8df018967c', 'Mahdi Hamdi', 'E-Commerce');
INSERT INTO public.customers VALUES ('098fd1ea-ecb0-4693-9128-8e2a5b96eeb4', 'Ghassen Zakraoui', 'IT');
INSERT INTO public.customers VALUES ('afc3f140-c4e0-4770-a014-095de6a9fb4f', 'Zeineb Labbene', 'IT');


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: ramez.ben.aribia
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
     description text,
    `product_type` varchar(45) DEFAULT NULL,
    PRIMARY KEY (`product_code`),
     "ownerId" uuid
);



INSERT INTO public.products VALUES ('9104c0ef-d6af-47ef-9bbd-7b71ab0e4e26', 'PC', NULL, 'IT',  '57603cd2-533c-4791-8adc-cf3ac1448b7d');
INSERT INTO public.products VALUES ('f794689b-a9e2-4404-8aa4-34192f6b8003', 'PHONE', NULL, 'IT',  NULL);
INSERT INTO public.products VALUES ('d9e6d085-6602-43e0-a4f6-2a0c1363d4bc', 'TV', NULL, 'IT',  NULL);
INSERT INTO public.products VALUES ('fd097652-1cfa-4c98-bff8-d85efc43b007', 'SPEAKER', NULL, 'IT',  '57603cd2-533c-4791-8adc-cf3ac1448b7d');
INSERT INTO public.products VALUES ('45123a60-ae65-4911-8ee3-d5a2e7b4a87d', 'FREEDGE', NULL, 'IT',  '57603cd2-533c-4791-8adc-cf3ac1448b7d');
INSERT INTO public.products VALUES ('8d1a2250-b4bf-4c91-8ad7-7c973b65962f', 'SMART WATCH', 'A new awsome watch',  '2022-05-28 10:39:21.998489', NULL);


--
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: ramez.ben.aribia
--



--
-- Data for Name: owners; Type: TABLE DATA; Schema: public; Owner: ramez.ben.aribia
--

INSERT INTO public.owners VALUES ('57603cd2-533c-4791-8adc-cf3ac1448b7d', 'ramez.ben.aribia', '$2b$10$wEtaRojLcNAtzfb4BmWp4ulaUBIQYrAqD8CaL9Hof/GI8KMJqN9I.', 'ramez.ben.aribia@gmail.com', '2022-05-28 10:39:21.558171', '2022-05-28 10:39:21.558171');


--
-- Name: owners PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: ramez.ben.aribia
--

ALTER TABLE ONLY public.owners
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: products PK_d429b7114371f6a35c5cb4776a7; Type: CONSTRAINT; Schema: public; Owner: ramez.ben.aribia
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY (id);


--
-- Name: customers PK_fb213f79ee45060ba925ecd576e; Type: CONSTRAINT; Schema: public; Owner: ramez.ben.aribia
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id);


--
-- Name: owners UQ_fe0bb3f6520ee0469504521e710; Type: CONSTRAINT; Schema: public; Owner: ramez.ben.aribia
--

ALTER TABLE ONLY public.owners
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username);


--
-- Name: products FK_05552e862619dc4ad7ec8fc9cb8; Type: FK CONSTRAINT; Schema: public; Owner: ramez.ben.aribia
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_05552e862619dc4ad7ec8fc9cb8" FOREIGN KEY ("ownerId") REFERENCES public.owners(id);





--
-- PostgreSQL database dump complete
--

