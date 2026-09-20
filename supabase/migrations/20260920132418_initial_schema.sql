-- ============================================================
-- COZY DOSE POS
-- Migration: Initial Schema
-- ============================================================


-- ============================================================
-- 1. PROFILES
-- ============================================================

create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    phone text,
    role text not null default 'customer'
        check (role in ('customer', 'staff', 'admin')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- ============================================================
-- 2. CATEGORIES
-- ============================================================

create table public.categories (
    id uuid primary key default gen_random_uuid(),

    name text not null,
    description text,

    sort_order integer not null default 0,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint categories_name_unique unique (name)
);


-- ============================================================
-- 3. PRODUCTS
-- ============================================================

create table public.products (
    id uuid primary key default gen_random_uuid(),

    category_id uuid not null
        references public.categories(id)
        on delete restrict,

    name text not null,
    description text,

    price numeric(10,2) not null
        check (price >= 0),

    image_url text,

    is_available boolean not null default true,
    is_featured boolean not null default false,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- ============================================================
-- 4. MODIFIER GROUPS
-- ============================================================

create table public.modifier_groups (
    id uuid primary key default gen_random_uuid(),

    name text not null,

    selection_type text not null default 'single'
        check (selection_type in ('single', 'multiple')),

    is_required boolean not null default false,

    min_selections integer not null default 0
        check (min_selections >= 0),

    max_selections integer,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint modifier_groups_selection_limit_check
        check (
            max_selections is null
            or max_selections >= min_selections
        )
);


-- ============================================================
-- 5. MODIFIERS
-- ============================================================

create table public.modifiers (
    id uuid primary key default gen_random_uuid(),

    modifier_group_id uuid not null
        references public.modifier_groups(id)
        on delete cascade,

    name text not null,

    price_adjustment numeric(10,2) not null default 0
        check (price_adjustment >= 0),

    is_available boolean not null default true,

    sort_order integer not null default 0,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- ============================================================
-- 6. PRODUCT ↔ MODIFIER GROUP
-- Many-to-many relationship
-- ============================================================

create table public.product_modifier_groups (
    product_id uuid not null
        references public.products(id)
        on delete cascade,

    modifier_group_id uuid not null
        references public.modifier_groups(id)
        on delete cascade,

    sort_order integer not null default 0,

    primary key (product_id, modifier_group_id)
);


-- ============================================================
-- 7. ORDERS
-- ============================================================

create table public.orders (
    id uuid primary key default gen_random_uuid(),

    order_number bigint generated always as identity unique,

    customer_id uuid
        references public.profiles(id)
        on delete set null,

    customer_name text not null,
    customer_phone text not null,

    order_type text not null
        check (order_type in ('pickup', 'delivery')),

    delivery_address text,

    payment_method text not null
        check (
            payment_method in (
                'cash',
                'gcash',
                'maya'
            )
        ),

    payment_reference text,
    payment_proof_url text,

    subtotal numeric(10,2) not null default 0
        check (subtotal >= 0),

    delivery_fee numeric(10,2) not null default 0
        check (delivery_fee >= 0),

    total numeric(10,2) not null default 0
        check (total >= 0),

    status text not null default 'pending'
        check (
            status in (
                'pending',
                'confirmed',
                'preparing',
                'ready',
                'completed',
                'cancelled'
            )
        ),

    notes text,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- ============================================================
-- 8. ORDER ITEMS
-- ============================================================

create table public.order_items (
    id uuid primary key default gen_random_uuid(),

    order_id uuid not null
        references public.orders(id)
        on delete cascade,

    product_id uuid
        references public.products(id)
        on delete set null,

    product_name text not null,

    unit_price numeric(10,2) not null
        check (unit_price >= 0),

    quantity integer not null
        check (quantity > 0),

    subtotal numeric(10,2) not null
        check (subtotal >= 0),

    special_instructions text,

    created_at timestamptz not null default now()
);


-- ============================================================
-- 9. ORDER ITEM MODIFIERS
-- ============================================================

create table public.order_item_modifiers (
    id uuid primary key default gen_random_uuid(),

    order_item_id uuid not null
        references public.order_items(id)
        on delete cascade,

    modifier_id uuid
        references public.modifiers(id)
        on delete set null,

    modifier_name text not null,

    price_adjustment numeric(10,2) not null default 0
        check (price_adjustment >= 0),

    quantity integer not null default 1
        check (quantity > 0),

    created_at timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================

create index products_category_id_idx
    on public.products(category_id);

create index products_available_idx
    on public.products(is_available);

create index modifiers_modifier_group_id_idx
    on public.modifiers(modifier_group_id);

create index orders_customer_id_idx
    on public.orders(customer_id);

create index orders_status_idx
    on public.orders(status);

create index orders_created_at_idx
    on public.orders(created_at desc);

create index order_items_order_id_idx
    on public.order_items(order_id);

create index order_item_modifiers_order_item_id_idx
    on public.order_item_modifiers(order_item_id);

-- ============================================================
-- UPDATED_AT FUNCTION
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger categories_set_updated_at
before update on public.categories
for each row
execute function public.set_updated_at();


create trigger products_set_updated_at
before update on public.products
for each row
execute function public.set_updated_at();


create trigger modifier_groups_set_updated_at
before update on public.modifier_groups
for each row
execute function public.set_updated_at();


create trigger modifiers_set_updated_at
before update on public.modifiers
for each row
execute function public.set_updated_at();


create trigger orders_set_updated_at
before update on public.orders
for each row
execute function public.set_updated_at();