# PayloadCMS Query Documentation

This guide explains how to query data in server components using PayloadCMS with React's `cache` function. This is to explain the syntax, query conventions, and output structure to developers and LLMs.

## Basic Query Example

```ts
const fetchAlternatives = cache(async ({ draft }: { draft?: boolean }) => {
  const { docs: alternatives } = await payload.find({
    collection: 'alternative',
    select: {
      name: true,
      createdAt: true,
      app: true,
      featuredOrder: true,
      isFeatured: true,
    },
    populate: {
      app: {
        name: true,
        slug: true,
        icon: true,
        glyph: true,
        brandPrimaryColor: true,
        brandSecondaryColor: true,
        brandTertiaryColor: true,
        brandBackgroundColor: true,
        alternatives: true,
        deals: true,
        categoryRecommendations: true,
      },
      app_category_recommendation: {
        category: true,
        recommendation: true,
        classification: true,
      },
      category: {
        name: true,
        slug: true,
        categoryCriteria: true,
      },
      category_criteria_criterion: {
        criterion: true,
      },
      criterion: {
        name: true,
        icon: true,
      },
      media: {
        filename: true,
        alt: true,
        height: true,
        width: true,
        url: true,
      },
      deal: {},
      alternative: {
        name: true,
        app: true,
      },
    },
    pagination: false,
    where: {
      app: { exists: true },
    },
    sort: ['featuredOrder', '-createdAt'],
    depth: 5,
    draft,
  })

  if (!alternatives || alternatives.length === 0) {
    throw new Error('Alternatives not found')
  }

  const alternativesWithAlternativeAppsArray = await Promise.all(
    alternatives.map(enrichAlternativeWithApps),
  )

  return alternativesWithAlternativeAppsArray
})
```

## Query Structure

### Collection

The `collection` parameter specifies which table to query using the collection name from the Payload schema.

### Select

- All fields to return are defined in the `select` clause
- The `id` field is always returned implicitly (never needs to be selected)

### Populate

All relationships are defined at the **root level** of the `populate` object. Nested relationships are NOT nested in the populate structure.

**Key Rule:** Top-level populate keys always use the database table name:

```ts
populate: {
  category_criteria_criterion: {...}
}

```

**Aliases:** When referencing relationships inside `select` or nested within other populate keys, use the **camelCase alias** from `@payload-types.ts`.

For example: `categoryCriteria` (alias) → `category_criteria_criterion` (table name)

### Collection Joins Reference

From `@payload-types.ts`:

```ts
collectionsJoins: {
  best: {
    faqs: 'bests_faqs'
  }
  review: {
    reviewCategoryCriterionRating: 'review_categoryCriterion_rating'
    faqs: 'reviews_faqs'
  }
  comparison: {
    comparisonApps: 'comparison_apps_app'
    aiSummary: 'comparison_categoryCriteria'
  }
  alternative: {
    alternativesFaqs: 'alternatives_faqs'
  }
  stack: {
    teamSizes: 'stack_teamSizes_teamSize'
    stackApps: 'stack_apps_app'
    stackFaqs: 'stacks_faqs'
  }
  blog: {
    faq: 'faq'
    blogApps: 'blog_apps_app'
    blogCategories: 'blog_categories_category'
    authors: 'blog_authors_author'
  }
  course: {
    productCourse: 'product_course'
    courseFaqs: 'courses_faqs'
  }
  app: {
    teamSizes: 'app_teamSizes_teamSize'
    categoryRecommendations: 'app_category_recommendation'
    review: 'review'
    videos: 'video_apps_app'
    blogs: 'blog_apps_app'
    deals: 'deal'
    dealInfo: 'deal_info'
    stackApps: 'stack_apps_app'
    courses: 'course'
    appVendors: 'vendors_apps'
    appCustomers: 'customer_vendors_vendor'
    screenshots: 'media'
    comparisonsApps: 'comparison_apps_app'
    alternatives: 'alternative'
  }
  category: {
    categoryCriteria: 'category_criteria_criterion'
    appRecommendations: 'app_category_recommendation'
    best: 'best'
    videos: 'video_categories_category'
    categoryGroups: 'category_categoryGroups_categoryGroup'
  }
  deal: {
    dealCustomers: 'customer_deals_deal'
  }
  faq: {
    review: 'reviews_faqs'
    best: 'bests_faqs'
    course: 'courses_faqs'
    stack: 'stacks_faqs'
    alternative: 'alternatives_faqs'
  }
  categoryGroup: {
    categories: 'category_categoryGroups_categoryGroup'
  }
  teamSize: {
    stacks: 'stack_teamSizes_teamSize'
    apps: 'app_teamSizes_teamSize'
  }
  linkTag: {
    links: 'link_linkTags_linkTag'
  }
  media: {
    appIcon: 'app'
    appGlyph: 'app'
    appWordmark: 'app'
    appHomepageImage: 'app'
  }
  video: {
    categories: 'video_categories_category'
    videoApps: 'video_apps_app'
  }
  link: {
    vendorApps: 'vendors_apps'
    linkTags: 'link_linkTags_linkTag'
    videos: 'video'
    deals: 'deal'
  }
  vendor: {
    apps: 'vendors_apps'
    customerVendor: 'customer_vendors_vendor'
  }
  product: {
    productCourse: 'product_course'
  }
  customer: {
    customerVendors: 'customer_vendors_vendor'
    customerDeals: 'customer_deals_deal'
  }
  users: {
    customers: 'customer'
  }
}
```

**Naming Pattern:** Aliases are typically plural, camelCase versions of snake_case table names.

- Table: `app_category_recommendation` → Alias: `categoryRecommendations`

## Query Examples

### Simple Nested Query

Querying `alternative[0].app.categoryRecommendations[0].category.name`:

```ts
await payload.find({
  collection: 'alternative',
  select: {
    name: true,
    app: true, // relationship
  },
  populate: {
    app: {
      name: true,
      categoryRecommendations: true, // relationship
    },
    app_category_recommendation: {
      category: true, // relationship
    },
    category: {
      name: true,
    },
  },
  pagination: false,
  where: { app: { exists: true } },
  depth: 3, // alternative(0) → app(1) → app_category_recommendation(2) → category(3)
})
```

**Note:** `populate.app.categoryRecommendations` uses the alias, while `populate.app_category_recommendation` uses the table name.

### Media Relationships

Querying media fields (icon, glyph) through relationships:

```ts
await payload.find({
  collection: 'alternative',
  select: {
    name: true,
    app: true,
  },
  populate: {
    app: {
      name: true,
      icon: true,
      glyph: true,
    },
    media: {
      filename: true,
      alt: true,
      height: true,
      width: true,
      url: true,
    },
  },
  pagination: false,
  where: { app: { exists: true } },
  depth: 2, // alternative(0) → app(1) → media(2)
})
```

### Complex Deep Query

A real-world example with depth 5 showing all key concepts:

```ts
await payload.find({
  collection: 'alternative',
  select: {
    // id is always included implicitly
    name: true,
    createdAt: true,
    app: true, // relationship field (matches populate key)
    featuredOrder: true,
    isFeatured: true,
  },
  populate: {
    // depth 1: app is a relationship, so it will be populated
    // We identify relationships by cross-referencing populate keys with aliases in @payload-types.ts
    app: {
      name: true,
      slug: true,
      icon: true,
      glyph: true,
      brandPrimaryColor: true,
      brandSecondaryColor: true,
      brandTertiaryColor: true,
      brandBackgroundColor: true,
      alternatives: true, // relationship - alias for 'alternative' table
      deals: true, // relationship - alias for 'deal' table
      categoryRecommendations: true, // relationship - alias for 'app_category_recommendation' table
    },
    // depth 2: Top-level populate keys use the actual table name, not the alias
    // Path: alternative → app → app_category_recommendation
    app_category_recommendation: {
      category: true, // relationship
      recommendation: true,
      classification: true,
    },
    // depth 3: Path: alternative → app → app_category_recommendation → category
    category: {
      name: true,
      slug: true,
      categoryCriteria: true, // relationship - alias for 'category_criteria_criterion'
    },
    // depth 4: Path: alternative → app → app_category_recommendation → category → category_criteria_criterion
    category_criteria_criterion: {
      criterion: true, // relationship
    },
    // depth 5: Path: alternative → app → app_category_recommendation → category → category_criteria_criterion → criterion
    criterion: {
      name: true,
      icon: true,
    },
    // media is a special case - it applies to ALL media relationships at any depth
    // In this query, it populates app.icon and app.glyph (depth 2)
    // If media was referenced deeper, this same definition would apply
    media: {
      filename: true,
      alt: true,
      height: true,
      width: true,
      url: true,
    },
    // Empty populate object {} returns only the id field
    deal: {},
    // Circular reference: alternative references itself through app.alternatives
    // This reuses the app populate definition above (depth 2: alternative → app → alternative)
    alternative: {
      name: true,
      app: true, // relationship - reuses the app populate defined above
    },
  },
  pagination: false,
  where: {
    app: { exists: true },
  },
  sort: ['featuredOrder', '-createdAt'],
  depth: 5,
  draft,
})
```

## Query Parameters

- **pagination**: Set to `false` to return all documents (no limit)
- **where**: Filter results (e.g., `{ app: { exists: true } }`)
- **sort**: Sort results (prefix with `-` for descending, e.g., `['-createdAt']`)
- **depth**: Maximum relationship depth to populate (0 = root collection)
- **draft**: Include draft documents (used for live previews)

## Query Output

Given this query:

```ts
await payload.find({
  collection: 'alternative',
  select: {
    name: true,
    createdAt: true,
    app: true,
    featuredOrder: true,
    isFeatured: true,
  },
  populate: {
    app: {
      name: true,
      slug: true,
      icon: true,
      glyph: true,
      brandPrimaryColor: true,
      brandSecondaryColor: true,
      brandTertiaryColor: true,
      brandBackgroundColor: true,
      alternatives: true,
      deals: true,
      categoryRecommendations: true,
    },
    app_category_recommendation: {
      category: true,
      recommendation: true,
      classification: true,
    },
    category: {
      name: true,
      slug: true,
      categoryCriteria: true,
    },
    category_criteria_criterion: {
      criterion: true,
    },
    criterion: {
      name: true,
      icon: true,
    },
    media: {
      filename: true,
      alt: true,
      height: true,
      width: true,
      url: true,
    },
    deal: {},
    alternative: {
      name: true,
      app: true,
    },
  },
  pagination: false,
  where: {
    app: { exists: true },
  },
  sort: ['-createdAt'],
  depth: 5,
})
```

The query returns these accessible fields:

```ts
// depth 0: alternative (root collection)
alternatives[0].id
alternatives[0].name
alternatives[0].createdAt
alternatives[0].featuredOrder
alternatives[0].isFeatured

// depth 1: app relationship
alternatives[0].app.id
alternatives[0].app.name
alternatives[0].app.slug
alternatives[0].app.brandPrimaryColor
alternatives[0].app.brandSecondaryColor
alternatives[0].app.brandTertiaryColor
alternatives[0].app.brandBackgroundColor

// depth 2: icon (media)
alternatives[0].app.icon.id
alternatives[0].app.icon.filename
alternatives[0].app.icon.alt
alternatives[0].app.icon.height
alternatives[0].app.icon.width
alternatives[0].app.icon.url

// depth 2: glyph (media)
alternatives[0].app.glyph.id
alternatives[0].app.glyph.filename
alternatives[0].app.glyph.alt
alternatives[0].app.glyph.height
alternatives[0].app.glyph.width
alternatives[0].app.glyph.url

// depth 2: alternatives (circular reference)
alternatives[0].app.alternatives[0].name

// depth 3: app (reuses app populate)
alternatives[0].app.alternatives[0].app.id
alternatives[0].app.alternatives[0].app.name
alternatives[0].app.alternatives[0].app.slug
alternatives[0].app.alternatives[0].app.brandPrimaryColor
alternatives[0].app.alternatives[0].app.brandSecondaryColor
alternatives[0].app.alternatives[0].app.brandTertiaryColor
alternatives[0].app.alternatives[0].app.brandBackgroundColor

// depth 2: deals (only id returned due to empty populate)
alternatives[0].app.deals[0].id

// depth 2: categoryRecommendations (junction table)
alternatives[0].app.categoryRecommendations[0].id
alternatives[0].app.categoryRecommendations[0].recommendation
alternatives[0].app.categoryRecommendations[0].classification

// depth 3: category
alternatives[0].app.categoryRecommendations[0].category.id
alternatives[0].app.categoryRecommendations[0].category.name
alternatives[0].app.categoryRecommendations[0].category.slug

// depth 4: categoryCriteria (junction table)
alternatives[0].app.categoryRecommendations[0].category.categoryCriteria[0].id

// depth 5: criterion (note: criterion.icon is a string, not a media relationship)
alternatives[0].app.categoryRecommendations[0].category.categoryCriteria[0].criterion.id
alternatives[0].app.categoryRecommendations[0].category.categoryCriteria[0].criterion.name
alternatives[0].app.categoryRecommendations[0].category.categoryCriteria[0].criterion.icon
```

**Note:** The `[0]` index indicates array access. All examples use the first item for simplicity.

### Complete Field List

The flat format shows all accessible paths as dot-notation strings:

```ts
alternatives[0].id
alternatives[0].name
alternatives[0].createdAt
alternatives[0].featuredOrder
alternatives[0].isFeatured
alternatives[0].app.id
alternatives[0].app.name
alternatives[0].app.slug
alternatives[0].app.brandPrimaryColor
alternatives[0].app.brandSecondaryColor
alternatives[0].app.brandTertiaryColor
alternatives[0].app.brandBackgroundColor
alternatives[0].app.icon.id
alternatives[0].app.icon.filename
alternatives[0].app.icon.alt
alternatives[0].app.icon.height
alternatives[0].app.icon.width
alternatives[0].app.icon.url
alternatives[0].app.glyph.id
alternatives[0].app.glyph.filename
alternatives[0].app.glyph.alt
alternatives[0].app.glyph.height
alternatives[0].app.glyph.width
alternatives[0].app.glyph.url
alternatives[0].app.alternatives[0].id
alternatives[0].app.alternatives[0].name
alternatives[0].app.alternatives[0].app.id
alternatives[0].app.alternatives[0].app.name
alternatives[0].app.alternatives[0].app.slug
alternatives[0].app.alternatives[0].app.brandPrimaryColor
alternatives[0].app.alternatives[0].app.brandSecondaryColor
alternatives[0].app.alternatives[0].app.brandTertiaryColor
alternatives[0].app.alternatives[0].app.brandBackgroundColor
alternatives[0].app.deals[0].id
alternatives[0].app.categoryRecommendations[0].id
alternatives[0].app.categoryRecommendations[0].recommendation
alternatives[0].app.categoryRecommendations[0].classification
alternatives[0].app.categoryRecommendations[0].category.id
alternatives[0].app.categoryRecommendations[0].category.name
alternatives[0].app.categoryRecommendations[0].category.slug
alternatives[0].app.categoryRecommendations[0].category.categoryCriteria[0].id
alternatives[0].app.categoryRecommendations[0].category.categoryCriteria[0].criterion.id
alternatives[0].app.categoryRecommendations[0].category.categoryCriteria[0].criterion.name
alternatives[0].app.categoryRecommendations[0].category.categoryCriteria[0].criterion.icon
```

Or as JSON:

```json
{
  "alternatives": [
    {
      "id": "",
      "createdAt": "",
      "featuredOrder": "",
      "isFeatured": "",
      "name": "",
      "app": {
        "id": "",
        "brandBackgroundColor": "",
        "brandPrimaryColor": "",
        "brandSecondaryColor": "",
        "brandTertiaryColor": "",
        "name": "",
        "slug": "",
        "glyph": {
          "id": "",
          "alt": "",
          "filename": "",
          "height": "",
          "url": "",
          "width": ""
        },
        "icon": {
          "id": "",
          "alt": "",
          "filename": "",
          "height": "",
          "url": "",
          "width": ""
        },
        "alternatives": [
          {
            "id": "",
            "name": "",
            "app": {
              "id": "",
              "brandBackgroundColor": "",
              "brandPrimaryColor": "",
              "brandSecondaryColor": "",
              "brandTertiaryColor": "",
              "name": "",
              "slug": ""
            }
          }
        ],
        "categoryRecommendations": [
          {
            "id": "",
            "classification": "",
            "recommendation": "",
            "category": {
              "id": "",
              "name": "",
              "slug": "",
              "categoryCriteria": [
                {
                  "id": "",
                  "criterion": {
                    "id": "",
                    "icon": "",
                    "name": ""
                  }
                }
              ]
            }
          }
        ],
        "deals": [
          {
            "id": ""
          }
        ]
      }
    }
  ]
}
```
