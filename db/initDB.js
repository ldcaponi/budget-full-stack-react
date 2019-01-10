const pool = require('.');
const initDBQuery = `
--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6
-- Dumped by pg_dump version 10.5

-- Started on 2019-01-10 10:11:43

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;


SET default_with_oids = false;

--
-- TOC entry 205 (class 1259 OID 16552)
-- Name: allocations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.allocations (
    id integer NOT NULL,
    owner_id integer NOT NULL,
    category_id integer NOT NULL,
    budget_id integer NOT NULL,
    amount numeric(20,2) NOT NULL
);


--
-- TOC entry 204 (class 1259 OID 16550)
-- Name: allocations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.allocations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2852 (class 0 OID 0)
-- Dependencies: 204
-- Name: allocations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.allocations_id_seq OWNED BY public.allocations.id;


--
-- TOC entry 203 (class 1259 OID 16537)
-- Name: budget; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.budget (
    id integer NOT NULL,
    owner_id integer NOT NULL,
    amount numeric(20,2) NOT NULL,
    start_day integer DEFAULT 1,
    name character varying(50) NOT NULL,
    CONSTRAINT "DAY_OF_MONTH" CHECK ((start_day < 29))
);


--
-- TOC entry 202 (class 1259 OID 16535)
-- Name: budget_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.budget_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2853 (class 0 OID 0)
-- Dependencies: 202
-- Name: budget_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.budget_id_seq OWNED BY public.budget.id;


--
-- TOC entry 201 (class 1259 OID 16442)
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    owner integer NOT NULL,
    category_name character varying(50) NOT NULL
);


--
-- TOC entry 200 (class 1259 OID 16440)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2854 (class 0 OID 0)
-- Dependencies: 200
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 199 (class 1259 OID 16424)
-- Name: expenses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.expenses (
    id integer NOT NULL,
    owner integer NOT NULL,
    category integer NOT NULL,
    description character varying(100),
    name character varying(50) NOT NULL,
    amount numeric(20,2) NOT NULL,
    created_at date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    budget_id integer NOT NULL
);


--
-- TOC entry 198 (class 1259 OID 16422)
-- Name: expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.expenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2855 (class 0 OID 0)
-- Dependencies: 198
-- Name: expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.expenses_id_seq OWNED BY public.expenses.id;


--
-- TOC entry 197 (class 1259 OID 16398)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(1000) NOT NULL,
    name character varying(50)
);


--
-- TOC entry 196 (class 1259 OID 16396)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2856 (class 0 OID 0)
-- Dependencies: 196
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2702 (class 2604 OID 16555)
-- Name: allocations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.allocations ALTER COLUMN id SET DEFAULT nextval('public.allocations_id_seq'::regclass);


--
-- TOC entry 2699 (class 2604 OID 16540)
-- Name: budget id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.budget ALTER COLUMN id SET DEFAULT nextval('public.budget_id_seq'::regclass);


--
-- TOC entry 2698 (class 2604 OID 16445)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 2696 (class 2604 OID 16427)
-- Name: expenses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenses ALTER COLUMN id SET DEFAULT nextval('public.expenses_id_seq'::regclass);


--
-- TOC entry 2695 (class 2604 OID 16401)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2704 (class 2606 OID 16405)
-- Name: users UNIQUE_EMAIL; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UNIQUE_EMAIL" UNIQUE (email);


--
-- TOC entry 2714 (class 2606 OID 16557)
-- Name: allocations allocations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.allocations
    ADD CONSTRAINT allocations_pkey PRIMARY KEY (id);


--
-- TOC entry 2712 (class 2606 OID 16543)
-- Name: budget budget_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.budget
    ADD CONSTRAINT budget_pkey PRIMARY KEY (id);


--
-- TOC entry 2710 (class 2606 OID 16455)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 2708 (class 2606 OID 16429)
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);


--
-- TOC entry 2706 (class 2606 OID 16403)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2717 (class 2606 OID 16577)
-- Name: expenses BUDGET; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT "BUDGET" FOREIGN KEY (budget_id) REFERENCES public.budget(id);


--
-- TOC entry 2722 (class 2606 OID 16568)
-- Name: allocations BUDGET_ID; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.allocations
    ADD CONSTRAINT "BUDGET_ID" FOREIGN KEY (budget_id) REFERENCES public.budget(id);


--
-- TOC entry 2716 (class 2606 OID 16461)
-- Name: expenses CATEGORY_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT "CATEGORY_FK" FOREIGN KEY (category) REFERENCES public.categories(id);


--
-- TOC entry 2721 (class 2606 OID 16563)
-- Name: allocations CATEGORY_ID; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.allocations
    ADD CONSTRAINT "CATEGORY_ID" FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- TOC entry 2715 (class 2606 OID 16435)
-- Name: expenses OWNER; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT "OWNER" FOREIGN KEY (owner) REFERENCES public.users(id);


--
-- TOC entry 2719 (class 2606 OID 16544)
-- Name: budget OWNER; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.budget
    ADD CONSTRAINT "OWNER" FOREIGN KEY (owner_id) REFERENCES public.users(id);


--
-- TOC entry 2718 (class 2606 OID 16446)
-- Name: categories OWNER_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "OWNER_FK" FOREIGN KEY (owner) REFERENCES public.users(id);


--
-- TOC entry 2720 (class 2606 OID 16558)
-- Name: allocations OWNER_ID; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.allocations
    ADD CONSTRAINT "OWNER_ID" FOREIGN KEY (owner_id) REFERENCES public.users(id);


-- Completed on 2019-01-10 10:11:44

--
-- PostgreSQL database dump complete
--

`;

module.exports = () => {
  //see if DB already exists
  return pool.query('SELECT * from users limit 1')
  //if so, do nothing, continue
  .then(res => Promise.resolve())
  //otherwise, run init script
  .catch(err => pool.query(initDBQuery))

}
