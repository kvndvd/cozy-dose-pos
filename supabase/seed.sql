insert into public.categories (
    name,
    description,
    sort_order
)
values
    (
        'Classic Coffee',
        'Espresso-based Classic Coffee',
        1
    ),
    (
        'Signature Coffee',
        'Espresso-based Signature Coffee',
        2
    ),
    (
        'Matcha',
        'Matcha-based drinks.',
        3
    ),
    (
        'Non-Coffee',
        'Creamy and chocolate-based drinks without coffee.',
        4
    );

insert into public.products (
    category_id,
    name,
    description,
    price
)
values

-- ============================================================
-- COFFEE
-- ============================================================

(
    (select id from public.categories where name = 'Classic Coffee'),
    'Americano',
    'Espresso, Water',
    90
),

(
    (select id from public.categories where name = 'Classic Coffee'),
    'Classic Latte',
    'Espresso, Milk',
    100
),

(
    (select id from public.categories where name = 'Classic Coffee'),
    'White Mocha',
    'Espresso, White Chocolate Sauce, Milk',
    120
),

(
    (select id from public.categories where name = 'Classic Coffee'),
    'Mocha',
    'Espresso, Chocolate Sauce, Cocoa Poweder, Milk',
    130
),

(
    (select id from public.categories where name = 'Classic Coffee'),
    'Caramel Macchiato',
    'Espresso, Caramel Syrup, Caramel Sauce, Milk',
    130
),

(
    (select id from public.categories where name = 'Signature Coffee'),
    'Spanish Latte',
    'Espresso, Condensed Milk, Milk',
    100
),

(
    (select id from public.categories where name = 'Signature Coffee'),
    'Cozy Latte',
    'Espresso, Flavor Syrup of your choice, Milk',
    110
),

(
    (select id from public.categories where name = 'Signature Coffee'),
    'Salted Caramel Cream',
    'Espresso, Caramel Sauce, Salted Caramel Cream, Milk',
    120
),

(
    (select id from public.categories where name = 'Signature Coffee'),
    'Vanilla Cream',
    'Espresso, white Chocolate Sauce, Vanilla Cream, Milk.',
    120
),


-- ============================================================
-- NON-COFFEE
-- ============================================================

(
    (select id from public.categories where name = 'Non-Coffee'),
    'Strawberry Milk',
    'Strawberry Purre, Milk',
    130
),

(
    (select id from public.categories where name = 'Non-Coffee'),
    'Double Chocolate',
    'Cocoa Powder, Chocolate Sauce, Milk',
    100
),

(
    (select id from public.categories where name = 'Non-Coffee'),
    'White Vanilla Milk',
    'White Chocolate Sauce, Vanilla Syrup, Milk',
    100
),


-- ============================================================
-- MATCHA
-- ============================================================

(
    (select id from public.categories where name = 'Matcha'),
    'Matcha Latte',
    'Matcha, Milk',
    180
),

(
    (select id from public.categories where name = 'Matcha'),
    'Dirty Matcha',
    'Espress, Matcha, Milk',
    210
),

(
    (select id from public.categories where name = 'Matcha'),
    'Strawberry Matcha',
    'Matcha, Strawberry Puree, Milk',
    250
);

insert into public.modifier_groups (
    name,
    selection_type,
    is_required,
    min_selections,
    max_selections
)
values

(
    'Milk Choice',
    'single',
    true,
    1,
    1
),

(
    'Syrup',
    'single',
    false,
    0,
    1
),

(
    'Extra Espresso',
    'single',
    false,
    0,
    1
);

insert into public.modifiers (
    modifier_group_id,
    name,
    price_adjustment,
    sort_order
)
values

-- Milk

(
    (select id from public.modifier_groups where name = 'Milk Choice'),
    'Whole Milk',
    0,
    1
),

(
    (select id from public.modifier_groups where name = 'Milk Choice'),
    'Oat Milk',
    30,
    2
),

-- Syrups

(
    (select id from public.modifier_groups where name = 'Syrup'),
    'Original',
    0,
    1
),

(
    (select id from public.modifier_groups where name = 'Syrup'),
    'Vanilla',
    20,
    2
),

(
    (select id from public.modifier_groups where name = 'Syrup'),
    'Caramel',
    20,
    3
),

(
    (select id from public.modifier_groups where name = 'Syrup'),
    'Hazelnut',
    20,
    4
),

-- Espresso

(
    (select id from public.modifier_groups where name = 'Extra Espresso'),
    'Default Shot',
    0,
    1
),

(
    (select id from public.modifier_groups where name = 'Extra Espresso'),
    '+1 Espresso Shot',
    40,
    2
),