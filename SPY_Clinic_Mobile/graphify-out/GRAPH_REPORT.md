# Graph Report - SPY_Clinic_Mobile  (2026-10-19)

## Corpus Check
- 244 files · ~97,740 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 10)

## Summary
- 1415 nodes · 2364 edges · 115 communities (101 shown, 14 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 204 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Run Notes (audit trail)
- **Token cost reads 0/0 because this run's semantic extraction was performed by 8 host-agent
  subagents**, not by the Gemini backend (no `GEMINI_API_KEY`/`GOOGLE_API_KEY` was set). The
  OpenCode subagent tool does not expose a per-call `usage` field, so no real token counts were
  available to record. The 0/0 above is a measurement gap, not evidence of a zero-cost run.
  AST extraction over 92 code files was deterministic and free.
- **Graph health check flagged edge collapse**, not corruption: 42 undirected / 21 directed
  parallel edges were merged because the graph is undirected and multiple source lines referenced
  the same node pair (e.g. `components_agendaform -> ref_styled_components` on both L4 and L5).
  The underlying source relationships are not lost; they are represented by one edge.
- **12 dangling-endpoint edges were found and repaired** after the first build: the AST emitter
  referenced 5 import targets it never created (`services_baseurl_base_url` plus the
  `ref_node_crypto` / `ref_node_fs` / `ref_node_path` / `ref_node_process` external module
  references). Those 5 nodes were added, and the final graph has 0 dangling endpoints.
- **10 files are unclassified** (no nodes emitted): `AGENTS.md`-style stubs and files the
  extractors modelled no symbols for.
- `graphify-out/` was written into the working tree and is **not** covered by `.gitignore`, so it
  will show in `git status`. Add `graphify-out/` to `.gitignore`, or commit only the outputs your
  team should share (see https://docs.graphify.com/guides/team-workflows).

## Community Hubs (Navigation)
- App Screens & Patient Flows
- Shared Header & Profile UI
- API Client, Auth & Session
- Accessibility Patterns & WCAG
- Design System & Color Tokens
- Expo Router Loaders & Offline
- Runtime Dependencies
- Package Manifest
- React Composition Patterns
- Expo App Configuration
- Re-render Worked Examples
- Native UI Guidelines & Icons
- Client Storage Caching & Hoisting
- Request Memoization & LRU Cache
- Re-render Optimization Rules
- Expo SDK Upgrade Workflow
- JavaScript Micro-Optimization Rules
- Bundle Size & Code Splitting
- Waterfall Elimination Patterns
- Backend Layered Architecture
- Node.js Backend Patterns
- App Store Submission & ASO
- Frontend Design Principles
- Server Caching & RSC Boundaries
- Effect Event Rules & Repo Layout
- Mobile Styling Systems
- User Auth & CRUD Operations
- Node.js Architecture Decisions
- EAS Build & Submit Config
- Media, Audio & Camera APIs
- Error Classes & Auth Middleware
- SWR Client Data Fetching
- EAS Fetch Cache Script
- Rendering Performance Rules
- Effect Event Stability Patterns
- SEO Fundamentals
- Consultorio Feature Module
- Dashboard Feature Module
- Agenda Feature Module
- EAS CI Workflows
- Native UI Controls
- Gradients & New Architecture
- JavaScript Memoization Patterns
- Advanced TypeScript Patterns
- Expo DOM Web Bridge
- Video Playback & expo-av Migration
- WebGPU 3D Rendering
- Deferred & Concurrent Updates
- Parallel Layout Data Fetching
- Structured Data & TS Unions
- TypeScript Type System
- Store Signing & Versioning
- Release Verification Discipline
- Glass & Visual Effects
- Client Fetching Rules
- Idle Work Scheduling
- EAS Hosting & API Routes
- Client Storage APIs
- Database Access Patterns
- Bundle Import Rules
- Waterfall Rule Catalog
- Layout Thrashing Avoidance
- Resource Hint Preloading
- SEO Audit Tooling
- Technical SEO
- TypeScript Config
- Expo Development Client
- React 19 Migration
- Input Validation & Security
- Theme Hydration Handling
- Effect Dependency Narrowing
- Event Handler Refactoring
- Server Action Auth
- RSC Serialization Deduplication
- On-Page SEO
- Dev Dependencies
- Package Scripts
- Expo Router Migration
- Barrel Import Optimization
- Versioned Local Storage
- Array Iteration Fusion
- Early Exit Patterns
- Lazy State & Search Indexing
- Non-Blocking After API
- Styled Components Theming
- Date Utility Helpers
- Root Package Metadata
- Native Tabs Migration
- API Response Envelope
- Set/Map Index Lookups
- Min/Max Without Sort
- Immutable Array Methods
- Script Loading Strategies
- ESLint Configuration
- Performance Rule Catalog
- Off-Screen Rendering
- Responsive Derived State
- Expo Versioned Docs Policy
- Cache Service API
- Rate Limiting Middleware
- Node Framework Setup
- Activity Show/Hide
- SVG Animation Wrapper
- Conditional Rendering Rules
- SVG Precision Optimization
- Metro Bundler Config
- Dev Client Agent Interface
- Order Creation Flow
- Mongoose User Model
- Turno Filter DTO
- pnpm Workspace Config
- Calendar Library Types
- Cache Service Delete
- Cache Pattern Invalidation

## God Nodes (most connected - your core abstractions)
1. `fetchApi()` - 55 edges
2. `react-native` - 32 edges
3. `react` - 27 edges
4. `styled-components` - 26 edges
5. `Accessibility (a11y) Skill` - 24 edges
6. `Rule Document Template` - 23 edges
7. `PrimaryButton` - 19 edges
8. `PrimaryButtonLabel` - 19 edges
9. `SecondaryButtonLabel` - 19 edges
10. `Expo Upgrade Skill` - 19 edges

## Surprising Connections (you probably didn't know these)
- `Cache Invalidation Flow` --references--> `useAgenda()`  [INFERRED]
  docs/TanStackQuery.md → hooks/useAgenda.ts
- `useQuery` --references--> `useAgenda()`  [INFERRED]
  docs/TanStackQuery.md → hooks/useAgenda.ts
- `AgendaScreen` --references--> `useAgenda()`  [INFERRED]
  ReadMe.md → hooks/useAgenda.ts
- `AgendaService` --semantically_similar_to--> `Type-Safe API Client`  [INFERRED] [semantically similar]
  ReadMe.md → .agents/skills/typescript-advanced-types/references/details.md
- `AgendaScreen` --semantically_similar_to--> `useQuery`  [INFERRED] [semantically similar]
  ReadMe.md → docs/TanStackQuery.md

## Import Cycles
- 1-file cycle: `.agents/skills/eas-workflows/scripts/fetch.js -> .agents/skills/eas-workflows/scripts/fetch.js`

## Hyperedges (group relationships)
- **WCAG 2.2 Success Criteria by Conformance Level** — agents_skills_accessibility_references_wcag, agents_skills_accessibility_references_wcag_level_a, agents_skills_accessibility_references_wcag_level_aa, agents_skills_accessibility_references_wcag_level_aaa [EXTRACTED 1.00]
- **React Composition Rule Set (architecture, state, patterns, react19)** — agents_skills_composition_patterns_rules_architecture_avoid_boolean_props, agents_skills_composition_patterns_rules_architecture_compound_components, agents_skills_composition_patterns_rules_state_context_interface, agents_skills_composition_patterns_rules_state_decouple_implementation, agents_skills_composition_patterns_rules_state_lift_state, agents_skills_composition_patterns_rules_patterns_explicit_variants, agents_skills_composition_patterns_rules_patterns_children_over_render_props, agents_skills_composition_patterns_rules_react19_no_forwardref [EXTRACTED 1.00]
- **Sleek Design-to-Native Implementation Pipeline** — agents_skills_design_mobile_apps_skill, agents_skills_design_mobile_apps_designing, agents_skills_design_mobile_apps_implementing, agents_skills_design_mobile_apps_endpoints, agents_skills_design_mobile_apps_designing_screenshot_loop, agents_skills_design_mobile_apps_implementing_version_selection, agents_skills_design_mobile_apps_implementing_design_tokens, agents_skills_design_mobile_apps_implementing_route_tree [EXTRACTED 1.00]
- **Native iOS EAS Release Pipeline** — agents_skills_eas_app_stores_skill_eas_app_stores_project_path_selection, agents_skills_eas_app_stores_references_native_ios_native_ios_build_and_submit_profiles, agents_skills_eas_app_stores_references_native_ios_native_ios_explicit_infoplist_versioning, agents_skills_eas_app_stores_references_native_ios_native_ios_ship_the_exact_build, agents_skills_eas_app_stores_references_testflight_testflight_submit_identified_build, agents_skills_eas_app_stores_references_ios_app_store_ios_public_release_procedure [EXTRACTED 1.00]
- **Porting Web Design Tokens to React Native Styling** — agents_skills_design_mobile_apps_styling_nativewind_nativewind_theme_token_porting, agents_skills_design_mobile_apps_styling_stylesheet_stylesheet_color_token_conversion, agents_skills_design_mobile_apps_styling_uniwind_uniwind_global_css_theme, agents_skills_design_mobile_apps_styling_uniwind_uniwind_oklch_support [INFERRED 0.85]
- **Release State Verification Across Stores** — agents_skills_eas_app_stores_skill_eas_app_stores_release_state_verification, agents_skills_eas_app_stores_references_testflight_testflight_release_state_tracking, agents_skills_eas_app_stores_references_play_store_play_store_submission_monitoring, agents_skills_eas_app_stores_references_ios_app_store_ios_public_release_procedure [INFERRED 0.85]
- **Expo Native UI Reference Library** — agents_skills_expo_native_ui_skill, agents_skills_expo_native_ui_references_controls, agents_skills_expo_native_ui_references_gradients, agents_skills_expo_native_ui_references_icons, agents_skills_expo_native_ui_references_media, agents_skills_expo_native_ui_references_storage, agents_skills_expo_native_ui_references_visual_effects, agents_skills_expo_native_ui_references_webgpu_three [EXTRACTED 1.00]
- **Expo Upgrade Migration Reference Set** — agents_skills_expo_upgrade_skill, agents_skills_expo_upgrade_references_expo_av_to_audio, agents_skills_expo_upgrade_references_expo_av_to_video, agents_skills_expo_upgrade_references_native_tabs, agents_skills_expo_upgrade_references_new_architecture, agents_skills_expo_upgrade_references_react_19, agents_skills_expo_upgrade_references_react_compiler, agents_skills_expo_upgrade_references_react_navigation_to_expo_router [EXTRACTED 1.00]
- **expo-av Deprecation Migration Flow** — agents_skills_expo_upgrade_skill_deprecated_package_migration, agents_skills_expo_upgrade_references_expo_av_to_audio_expo_av_audio_api, agents_skills_expo_upgrade_references_expo_av_to_video_expo_av_video_component, agents_skills_expo_native_ui_skill_library_preferences, agents_skills_expo_native_ui_references_media_audio_playback, agents_skills_expo_native_ui_references_media_video_playback [INFERRED 0.85]
- **Layered Node.js Backend Architecture (Controller -> Service -> Repository)** — agents_skills_nodejs_backend_patterns_references_details_controller_layer, agents_skills_nodejs_backend_patterns_references_details_service_layer, agents_skills_nodejs_backend_patterns_references_details_repository_layer, agents_skills_nodejs_backend_patterns_references_details_user_controller, agents_skills_nodejs_backend_patterns_references_details_user_service, agents_skills_nodejs_backend_patterns_references_details_user_repository [EXTRACTED 1.00]
- **Custom Application Error Class Hierarchy (AppError subclasses)** — agents_skills_nodejs_backend_patterns_references_details_apperror, agents_skills_nodejs_backend_patterns_references_details_validationerror, agents_skills_nodejs_backend_patterns_references_details_notfounderror, agents_skills_nodejs_backend_patterns_references_details_unauthorizederror, agents_skills_nodejs_backend_patterns_references_details_forbiddenerror, agents_skills_nodejs_backend_patterns_references_details_conflicterror [EXTRACTED 1.00]
- **JWT Authentication Flow (middleware verify + service issue/refresh tokens)** — agents_skills_nodejs_backend_patterns_references_details_authenticate, agents_skills_nodejs_backend_patterns_references_details_authorize, agents_skills_nodejs_backend_patterns_references_advanced_patterns_auth_service, agents_skills_nodejs_backend_patterns_references_advanced_patterns_auth_service_login, agents_skills_nodejs_backend_patterns_references_advanced_patterns_auth_service_refreshtoken, agents_skills_nodejs_backend_patterns_references_advanced_patterns_auth_service_generatetoken [INFERRED 0.85]
- **Async Waterfall Elimination Rules** — agents_skills_react_best_practices_rules_async_api_routes_prevent_waterfall_chains_in_api_routes, agents_skills_react_best_practices_rules_async_cheap_condition_before_await_check_cheap_conditions_before_async_flags, agents_skills_react_best_practices_rules_async_defer_await_defer_await_until_needed, agents_skills_react_best_practices_rules_async_dependencies_dependency_based_parallelization, agents_skills_react_best_practices_rules_async_parallel_promise_all_for_independent_operations, agents_skills_react_best_practices_rules_async_suspense_boundaries_strategic_suspense_boundaries [EXTRACTED 1.00]
- **Bundle Size Optimization Rules** — agents_skills_react_best_practices_rules_bundle_analyzable_paths_prefer_statically_analyzable_paths, agents_skills_react_best_practices_rules_bundle_barrel_imports_avoid_barrel_file_imports, agents_skills_react_best_practices_rules_bundle_conditional_conditional_module_loading, agents_skills_react_best_practices_rules_bundle_defer_third_party_defer_non_critical_third_party_libraries, agents_skills_react_best_practices_rules_bundle_dynamic_imports_dynamic_imports_for_heavy_components, agents_skills_react_best_practices_rules_bundle_preload_preload_based_on_user_intent [EXTRACTED 1.00]
- **Stable Callback Identity Patterns (Effect Events and Refs)** — agents_skills_react_best_practices_rules_advanced_effect_event_deps_effect_event_in_dependency_arrays, agents_skills_react_best_practices_rules_advanced_event_handler_refs_store_event_handlers_in_refs, agents_skills_react_best_practices_rules_advanced_use_latest_useeffectevent_for_stable_callback_refs, agents_skills_react_best_practices_rules_advanced_use_latest_useeffectevent [EXTRACTED 1.00]
- **JavaScript Array Processing Efficiency Rules** — agents_skills_react_best_practices_rules_js_combine_iterations, agents_skills_react_best_practices_rules_js_flatmap_filter, agents_skills_react_best_practices_rules_js_min_max_loop, agents_skills_react_best_practices_rules_js_length_check_first, agents_skills_react_best_practices_rules_js_set_map_lookups, agents_skills_react_best_practices_rules_js_index_maps [INFERRED 0.85]
- **SSR Hydration Mismatch Mitigation Strategies** — agents_skills_react_best_practices_rules_rendering_hydration_no_flicker, agents_skills_react_best_practices_rules_rendering_hydration_suppress_warning, agents_skills_react_best_practices_rules_rendering_hydration_no_flicker_react_hydration_mismatch [INFERRED 0.85]
- **Main Thread Responsiveness Scheduling** — agents_skills_react_best_practices_rules_js_request_idle_callback, agents_skills_react_best_practices_rules_rendering_usetransition_loading, agents_skills_react_best_practices_rules_js_request_idle_callback_main_thread_responsiveness [INFERRED 0.75]
- **React Re-render Optimization Rule Set** — agents_skills_react_best_practices_rules_rerender_derived_state_subscribe_to_derived_state, agents_skills_react_best_practices_rules_rerender_functional_setstate_functional_setstate_updates, agents_skills_react_best_practices_rules_rerender_lazy_state_init_lazy_state_initialization, agents_skills_react_best_practices_rules_rerender_memo_with_default_value_extract_default_non_primitive_parameter_value, agents_skills_react_best_practices_rules_rerender_memo_extract_to_memoized_components, agents_skills_react_best_practices_rules_rerender_move_effect_to_event_put_interaction_logic_in_event_handlers, agents_skills_react_best_practices_rules_rerender_no_inline_components_dont_define_components_inside_components, agents_skills_react_best_practices_rules_rerender_simple_expression_in_memo_do_not_wrap_simple_expression_in_usememo, agents_skills_react_best_practices_rules_rerender_split_combined_hooks_split_combined_hook_computations, agents_skills_react_best_practices_rules_rerender_transitions_use_transitions_for_non_urgent_updates, agents_skills_react_best_practices_rules_rerender_use_deferred_value_use_deferred_value_for_expensive_derived_renders, agents_skills_react_best_practices_rules_rerender_use_ref_transient_values_use_ref_for_transient_values [INFERRED 0.85]
- **Server-Side Performance Rule Set** — agents_skills_react_best_practices_rules_server_after_nonblocking_use_after_for_non_blocking_operations, agents_skills_react_best_practices_rules_server_auth_actions_authenticate_server_actions_like_api_routes, agents_skills_react_best_practices_rules_server_cache_lru_cross_request_lru_caching, agents_skills_react_best_practices_rules_server_cache_react_per_request_deduplication_with_react_cache, agents_skills_react_best_practices_rules_server_dedup_props_avoid_duplicate_serialization_in_rsc_props, agents_skills_react_best_practices_rules_server_hoist_static_io_hoist_static_io_to_module_level, agents_skills_react_best_practices_rules_server_no_shared_module_state_avoid_shared_module_state_for_request_data, agents_skills_react_best_practices_rules_server_parallel_fetching_parallel_data_fetching_with_component_composition, agents_skills_react_best_practices_rules_server_parallel_nested_fetching_parallel_nested_data_fetching, agents_skills_react_best_practices_rules_server_serialization_minimize_serialization_at_rsc_boundaries [INFERRED 0.85]
- **Server Data Deduplication and Caching Flow** — agents_skills_react_best_practices_rules_server_cache_react_react_cache, agents_skills_react_best_practices_rules_server_cache_react_nextjs_fetch_request_memoization, agents_skills_react_best_practices_rules_server_cache_react_getcurrentuser, agents_skills_react_best_practices_rules_server_cache_lru_cross_request_lru_caching, agents_skills_react_best_practices_rules_server_cache_lru_getuser, agents_skills_react_best_practices_rules_server_cache_lru_lrucache [INFERRED 0.85]
- **Technical SEO Crawl and Index Controls** — agents_skills_seo_skill_robots_txt, agents_skills_seo_skill_meta_robots, agents_skills_seo_skill_canonical_urls, agents_skills_seo_skill_xml_sitemap, agents_skills_seo_skill_url_structure [EXTRACTED 1.00]
- **TypeScript Advanced Type System Pillars** — agents_skills_typescript_advanced_types_skill_generics, agents_skills_typescript_advanced_types_skill_conditional_types, agents_skills_typescript_advanced_types_skill_mapped_types, agents_skills_typescript_advanced_types_skill_template_literal_types, agents_skills_typescript_advanced_types_skill_utility_types [EXTRACTED 1.00]
- **TanStack Query Read-Write-Invalidation Flow** — docs_tanstackquery_usequery, docs_tanstackquery_usemutation, docs_tanstackquery_usequeryclient, docs_tanstackquery_queryclient, docs_tanstackquery_cache_invalidation_flow [EXTRACTED 1.00]

## Communities (115 total, 14 thin omitted)

### Community 0 - "App Screens & Patient Flows"
Cohesion: 0.05
Nodes (80): Home(), ListaTurnos(), paciente(), PlanTurno(), Psicologo(), Turno(), AgendaForm(), AgendaFormProps (+72 more)

### Community 1 - "Shared Header & Profile UI"
Cohesion: 0.06
Nodes (53): Avatar, AvatarText, Header(), HeaderBar, HeaderSafe, Info, Name, Profile (+45 more)

### Community 2 - "API Client, Auth & Session"
Cohesion: 0.08
Nodes (50): useAgenda(), usePlanTurno(), expo-device, expo-secure-store, fetchApi(), session(), BASE_URL, create() (+42 more)

### Community 3 - "Accessibility Patterns & WCAG"
Cohesion: 0.07
Nodes (34): Minimum 44x44 Touch Target, Accessibility Code Patterns, Screen Reader Commands Reference (VoiceOver / NVDA), WCAG 2.2 Quick Reference, What Changed from WCAG 2.1 to 2.2, Common ARIA Patterns (WCAG reference), WCAG 2.2 Level A Success Criteria, WCAG 2.2 Level AA Success Criteria (+26 more)

### Community 4 - "Design System & Color Tokens"
Cohesion: 0.09
Nodes (25): PsicoTools Design Context, Brand & Accent Primitive Color Tokens, PsicoTools Color Palette, FrontEnd/src/index.css (Source of Truth), Semantic Color Tokens (Light and Dark Modes), Typography and Font Stack (Roboto + fallbacks), Designing with Sleek (Workflow), User Shot vs Review Shot (+17 more)

### Community 5 - "Expo Router Loaders & Offline"
Cohesion: 0.09
Nodes (32): Hosting Environment Secrets, Expo Data Fetching Agent Interface Descriptor, Expo Router Data Loaders Reference, Route-Level Data Loaders, LoaderFunction Type and Params, StatusError and setResponseHeaders, Suspense and ErrorBoundary Boundaries, Offline Support and Request Cancellation Reference (+24 more)

### Community 6 - "Runtime Dependencies"
Cohesion: 0.06
Nodes (36): dependencies, css-to-react-native, expo, expo-constants, expo-device, expo-font, @expo-google-fonts/roboto, expo-haptics (+28 more)

### Community 7 - "Package Manifest"
Cohesion: 0.07
Nodes (29): main, name, private, version, css-to-react-native, expo-constants, expo-font, expo-haptics (+21 more)

### Community 8 - "React Composition Patterns"
Cohesion: 0.21
Nodes (17): React Composition Patterns (Compiled Guide), ChannelProvider, ComposerContext, ComposerInput, ComposerProvider, ForwardButton, ForwardMessageProvider, MessagePreview (+9 more)

### Community 9 - "Expo App Configuration"
Cohesion: 0.09
Nodes (22): backgroundColor, adaptiveIcon, edgeToEdgeEnabled, predictiveBackGestureEnabled, reactCompiler, typedRoutes, expo, android (+14 more)

### Community 10 - "Re-render Worked Examples"
Cohesion: 0.10
Nodes (16): ItemsEditor, Stale Closure Bug, TodoList, Avatar, computeAvatarId, Profile, React Compiler, UserAvatar (+8 more)

### Community 11 - "Native UI Guidelines & Icons"
Cohesion: 0.15
Nodes (12): DOM Components, Expo Native UI Agent Interface, Native-Feeling Screen Construction, SF Symbols Reference, Animated Symbols, Multicolor Symbols, expo-symbols SymbolView, Symbol Weights and Scales (+4 more)

### Community 12 - "Client Storage Caching & Hoisting"
Cohesion: 0.13
Nodes (12): Browser Storage APIs (localStorage, sessionStorage, document.cookie), Cookie Cache, getLocalStorage, setLocalStorage, EMAIL_REGEX, Highlighter, loadingSkeleton Static Element, React Compiler (+4 more)

### Community 13 - "Request Memoization & LRU Cache"
Cohesion: 0.12
Nodes (16): Vercel Fluid Compute documentation, getUser, LRUCache, node-lru-cache (GitHub), getCurrentUser, getUser, Next.js fetch request memoization, React.cache() (+8 more)

### Community 14 - "Re-render Optimization Rules"
Cohesion: 0.13
Nodes (19): 5.1 Calculate Derived State During Rendering, 5.2 Defer State Reads to Usage Point, 5.3 Do Not Wrap a Simple Expression With a Primitive Result Type in useMemo, 5.4 Don't Define Components Inside Components, 5.5 Extract Default Non-Primitive Parameter Value from Memoized Component to Constant, 5.6 Extract to Memoized Components, 7.10 Hoist RegExp Creation, 6.3 Hoist Static JSX Elements (+11 more)

### Community 15 - "Expo SDK Upgrade Workflow"
Cohesion: 0.18
Nodes (15): Expo Upgrade Agent Interface, SDK Upgrade Workflow, React Compiler, Build-Time Verification, reactCompiler Experiment Flag, Manual Memoization Cleanup, Expo Upgrade Skill, Beta/Preview Releases (+7 more)

### Community 16 - "JavaScript Micro-Optimization Rules"
Cohesion: 0.12
Nodes (18): 3.2 Avoid Duplicate Serialization in RSC Props, 7.1 Avoid Layout Thrashing, 7.2 Build Index Maps for Repeated Lookups, 7.3 Cache Property Access in Loops, 7.4 Cache Repeated Function Calls, cachedSlugify (module-level function result cache), 7.6 Combine Multiple Array Iterations, 7.7 Defer Non-Critical Work with requestIdleCallback (+10 more)

### Community 17 - "Bundle Size & Code Splitting"
Cohesion: 0.19
Nodes (13): Bundle Size Optimization, Next.js output file tracing documentation, Next.js Output File Tracing, PAGE_MODULES (explicit module map), AnimationPlayer (conditional lazy-load example), typeof window !== 'undefined' SSR guard, RootLayout (deferred analytics example), CodePanel (heavy component consumer) (+5 more)

### Community 18 - "Waterfall Elimination Patterns"
Cohesion: 0.20
Nodes (12): Eliminating Waterfalls, Rule Document Template, GET (API route handler example), getFlag (async feature-flag lookup), handleRequest (deferred await example), updateResource (early-return ordering example), better-all (dependency-aware parallelization library), Promise.all() (+4 more)

### Community 19 - "Backend Layered Architecture"
Cohesion: 0.15
Nodes (17): AuthService, Authentication & Authorization, Container, Container.register, Container.resolve, Container.singleton, Dependency Injection, DI Container Pattern (+9 more)

### Community 20 - "Node.js Backend Patterns"
Cohesion: 0.18
Nodes (15): Node.js Advanced Patterns, API Response Format (success, error, paginated), asyncHandler, Authentication & Authorization (JWT 15m access / 7d refresh), Authentication Middleware, Caching Strategies (Redis CacheService + Cacheable decorator), Database Patterns (SQL and NoSQL, connection pooling), Dependency Injection Pattern (+7 more)

### Community 21 - "App Store Submission & ASO"
Cohesion: 0.17
Nodes (15): App Store Metadata Reference, Age Rating Advisory, Dynamic store.config.js Configuration, App Store Localization, App Store Optimization (ASO), App Store Release Strategy, App Review Information, EAS Metadata and store.config.json (+7 more)

### Community 22 - "Frontend Design Principles"
Cohesion: 0.16
Nodes (7): Apache License 2.0, Quality Floor (responsive, visible focus, reduced motion, accessible contrast), AI-Generated Design Tells, Compact Design Token System (color, type, layout, principles), The Elements of Typographic Style, Frontend Design Skill, Type Scale and Line Length Rules

### Community 23 - "Server Caching & RSC Boundaries"
Cohesion: 0.15
Nodes (15): CacheService, Caching Strategies, 3.3 Avoid Shared Module State for Request Data, 3.4 Cross-Request LRU Caching, getCurrentUser (React.cache-wrapped user query), 3.5 Hoist Static I/O to Module Level, LRUCache (node-lru-cache), 3.6 Minimize Serialization at RSC Boundaries (+7 more)

### Community 24 - "Effect Event Rules & Repo Layout"
Cohesion: 0.18
Nodes (16): 8. Advanced Patterns (LOW), 8.1 Do Not Put Effect Events in Dependency Arrays, 8.2 Initialize App Once, Not Per Mount, React Best Practices - Vercel Engineering Performance Guide, 8.3 Store Event Handlers in Refs, useEffectEvent, 8.4 useEffectEvent for Stable Callback Refs, Rule Area Prefixes (+8 more)

### Community 25 - "Mobile Styling Systems"
Cohesion: 0.19
Nodes (7): Styling: Nativewind, Theme Token Porting, Third-Party Component Class Mapping, Styling: StyleSheet, Styling: Uniwind, Uniwind global.css Theme, withUniwind Third-Party Wrapping

### Community 26 - "User Auth & CRUD Operations"
Cohesion: 0.13
Nodes (15): AuthService.generateRefreshToken, AuthService.generateToken, AuthService.login, AuthService.refreshToken, NotFoundError, UserController.deleteUser, UserController.getUser, UserController.updateUser (+7 more)

### Community 27 - "Node.js Architecture Decisions"
Cohesion: 0.14
Nodes (11): javascript-testing-patterns Skill, Middleware and Error Handling Patterns, Node.js Backend Patterns Skill, Anti-Patterns to Avoid, Async Pattern Selection (all/allSettled/race), Decision Checklist, Hono / Fastify / Express Comparison, Framework Selection Decision Tree (Hono/Fastify/NestJS/Express/Next.js) (+3 more)

### Community 28 - "EAS Build & Submit Config"
Cohesion: 0.18
Nodes (10): EAS App Stores Agent Interface Descriptor, Native Swift iOS Apps on EAS, Native iOS Build and Submit Profiles, Minimal package.json for Native Projects, Minimal Podfile Adapter, EAS App Store Deployment Skill, EAS Build and Submit Command Surface, eas.json Configuration for Builds and Submits (+2 more)

### Community 29 - "Media, Audio & Camera APIs"
Cohesion: 0.26
Nodes (11): SF Symbols, Media Reference, Audio Playback with expo-audio, Audio Recording with expo-audio, Base64 to Local URI, Camera Capture with expo-camera, Media Library Saving, expo-av to expo-audio Migration (+3 more)

### Community 30 - "Error Classes & Auth Middleware"
Cohesion: 0.15
Nodes (13): AppError, authenticate middleware, authorize middleware (role based), ConflictError, Custom Error Classes, ForbiddenError, JWTPayload interface, UnauthorizedError (+5 more)

### Community 31 - "SWR Client Data Fetching"
Cohesion: 0.21
Nodes (10): Client-Side Data Fetching, keyCallbacks (module-level callback registry), useKeyboardShortcut (deduplicated shortcut hook), useSWRSubscription, { passive: true } listener option, SWR (stale-while-revalidate), SWR documentation, useImmutableSWR (+2 more)

### Community 32 - "EAS Fetch Cache Script"
Cohesion: 0.24
Nodes (11): CACHE_DIRECTORY, fetchCached(), getExpires(), hashUrl(), loadCacheEntry(), parseMaxAge(), saveCacheEntry(), node:crypto (+3 more)

### Community 33 - "Rendering Performance Rules"
Cohesion: 0.17
Nodes (12): 6.1 Animate SVG Wrapper Instead of SVG Element, 6.2 CSS content-visibility for Long Lists, 6.4 Optimize SVG Precision, 6.5 Prevent Hydration Mismatch Without Flickering, 6. Rendering Performance (MEDIUM), 6.6 Suppress Expected Hydration Mismatches, SVGO, 6.7 Use Activity Component for Show/Hide (+4 more)

### Community 34 - "Effect Event Stability Patterns"
Cohesion: 0.29
Nodes (8): Advanced Patterns, ChatRoom (Effect Event dependency example), useWindowEvent (stable subscription hook), Comp (initialization effect example), didInit (module-level initialization guard), SearchInput (debounced search example), Stale Closure, useEffectEvent (React hook)

### Community 35 - "SEO Fundamentals"
Cohesion: 0.17
Nodes (12): SEO Optimization Skill, Agentic Browsing and AI Discoverability, Product-Specific Crawler Controls, Font Sizes, Hreflang Tags, International SEO, Language Declaration (html lang), llms.txt (Optional) (+4 more)

### Community 36 - "Consultorio Feature Module"
Cohesion: 0.38
Nodes (7): Consultorio(), ConsultorioForm(), styles, useConsultorio(), ConsultorioDto, ConsultorioScreen(), styles

### Community 37 - "Dashboard Feature Module"
Cohesion: 0.27
Nodes (7): DashBoard(), Dashboard(), DashboardProps, useDashboard(), AttendanceStatsDto, react-native-chart-kit, DashboardScreen()

### Community 38 - "Agenda Feature Module"
Cohesion: 0.29
Nodes (12): Agenda App Architecture Overview (ReadMe), AgendaDto, AgendaForm, AgendaScreen, AgendaService, AgendaService.createAgenda, AgendaService.getAgendas, AgendaService.removeAgenda (+4 more)

### Community 39 - "EAS CI Workflows"
Cohesion: 0.25
Nodes (9): EAS Workflows Store-Release Examples, Conditional Workflow Jobs, PR Previews with EAS Update, Production Release Workflow, EAS Workflows Agent Interface Descriptor, EAS Workflows Skill, Workflow Expression Contexts, Workflow File Location and Size Limit (+1 more)

### Community 40 - "Native UI Controls"
Cohesion: 0.31
Nodes (9): Native Controls Reference, Native Accessibility Defaults, DateTimePicker, Built-in Native Haptics, Segmented Control, Native Slider, Native Switch, Native TextInput (+1 more)

### Community 41 - "Gradients & New Architecture"
Cohesion: 0.29
Nodes (10): CSS Gradients Reference, CSS Gradients, experimental_backgroundImage, Frosted Glass Gradient, Multiple Gradient Stacking, New Architecture, Fabric, JSI (JavaScript Interface) (+2 more)

### Community 42 - "JavaScript Memoization Patterns"
Cohesion: 0.25
Nodes (9): JavaScript Performance, cachedSlugify (memoized helper), isLoggedIn (single-value memoized predicate), Module-Level Memoization Cache, ProjectList (cached-slug consumer), slugify (pure string helper), slugifyCache (module-level Map), How we made the Vercel Dashboard twice as fast (Vercel engineering blog) (+1 more)

### Community 43 - "Advanced TypeScript Patterns"
Cohesion: 0.22
Nodes (11): TypeScript Advanced Types - Detailed Worked Examples, Assertion Functions, Builder Pattern with Type Safety, Deep Readonly and Deep Partial, Infer Keyword, Type Guards, Type Inference Techniques, Type-Safe API Client (+3 more)

### Community 44 - "Expo DOM Web Bridge"
Cohesion: 0.20
Nodes (8): Expo DOM Components Agent Interface, Expo DOM Component Strategy, Expo DOM Components Skill, DOMProps dom Prop, IS_DOM Environment Detection, Router Hooks Requiring Props, 'use dom' Directive, Web-Only Library Support

### Community 45 - "Video Playback & expo-av Migration"
Cohesion: 0.33
Nodes (8): Video Playback with expo-video, expo-av Audio API, expo-av to expo-video Migration, Android Known Issues, expo-av Video Component, PiP and Background Playback, useEvent Event System, Video API Mapping

### Community 46 - "WebGPU 3D Rendering"
Cohesion: 0.36
Nodes (9): WebGPU & Three.js Reference, THREE Namespace extend(), FiberCanvas, Lazy Three.js Loading, makeWebGPURenderer, Metro Resolver Override, Orbit Touch Controls, 3D Performance Optimization (+1 more)

### Community 47 - "Deferred & Concurrent Updates"
Cohesion: 0.22
Nodes (7): ScrollTracker, startTransition, fuzzyMatch, ResultsList, Search, React useDeferredValue reference (react.dev), Tracker

### Community 48 - "Parallel Layout Data Fetching"
Cohesion: 0.29
Nodes (8): fetchHeader, fetchSidebarItems, Header, Layout, Page, Sidebar, getChat, getUser

### Community 49 - "Structured Data & TS Unions"
Cohesion: 0.22
Nodes (10): Structured Data Reference, Article Schema, BreadcrumbList Schema, FAQPage Schema, Organization Schema, Product Schema, Schema.org Vocabulary, Structured Data (JSON-LD) (+2 more)

### Community 50 - "TypeScript Type System"
Cohesion: 0.20
Nodes (9): TypeScript Advanced Types Skill, Conditional Types, Generic Constraints, Generics, Mapped Type Key Remapping, Mapped Types, TypeScript Performance Considerations, Template Literal Types (+1 more)

### Community 51 - "Store Signing & Versioning"
Cohesion: 0.25
Nodes (8): iOS Credential Setup, iOS Version and Build Numbers, Submitting to Google Play Store, Google Play App Signing, Google Play Release Tracks, Google Play Service Account Setup, Staged Rollout and Release Status, Android versionCode Management

### Community 52 - "Release Verification Discipline"
Cohesion: 0.28
Nodes (5): AppIcon Alpha Channel Check, Native iOS Path Verification Scope, TestFlight Reference, eas submit:retry Eligibility, TestFlight Troubleshooting Matrix

### Community 53 - "Glass & Visual Effects"
Cohesion: 0.36
Nodes (7): GlassButton Helper, Visual Effects Reference, AdaptiveGlass Fallback, Backdrop Blur with BlurView, Glass Button, Liquid Glass with GlassView, Sheet with Glass Background

### Community 54 - "Client Fetching Rules"
Cohesion: 0.22
Nodes (9): 7.5 Cache Storage API Calls, 4. Client-Side Data Fetching (MEDIUM-HIGH), 4.1 Deduplicate Global Event Listeners, getLocalStorage (cached storage reads), SWR, useKeyboardShortcut hook (shared global listener), 4.2 Use Passive Event Listeners for Scrolling Performance, 4.3 Use SWR for Automatic Deduplication (+1 more)

### Community 55 - "Idle Work Scheduling"
Cohesion: 0.31
Nodes (7): Main Thread Responsiveness, Chunked Idle Processing, requestIdleCallback, scheduleIdleWork Fallback, SearchResults, useTransition, React useTransition Reference

### Community 56 - "EAS Hosting & API Routes"
Cohesion: 0.32
Nodes (5): EAS Hosting Agent Interface Descriptor, EAS Hosting Skill, Expo Router API Routes (+api.ts), API Route Authentication Middleware, Edge Database Options

### Community 57 - "Client Storage APIs"
Cohesion: 0.50
Nodes (7): Storage Reference, Full expo-sqlite, Reactive Storage Utility, expo-secure-store, Storage Selection Matrix, useStorage Hook, useSyncExternalStore Integration

### Community 58 - "Database Access Patterns"
Cohesion: 0.25
Nodes (8): closeDatabase, connectDB, Database Patterns, MongoDB with Mongoose, OrderService, poolConfig (PoolConfig), PostgreSQL Connection Pool, Transaction Pattern (BEGIN/COMMIT/ROLLBACK)

### Community 59 - "Bundle Import Rules"
Cohesion: 0.25
Nodes (8): 2.1 Avoid Barrel File Imports, 2. Bundle Size Optimization (CRITICAL), 2.2 Conditional Module Loading, 2.3 Defer Non-Critical Third-Party Libraries, 2.4 Dynamic Imports for Heavy Components, optimizePackageImports (Next.js config), 2.5 Prefer Statically Analyzable Paths, 2.6 Preload Based on User Intent

### Community 60 - "Waterfall Rule Catalog"
Cohesion: 0.32
Nodes (8): better-all (dependency-aware parallel task runner), 1.1 Check Cheap Conditions Before Async Flags, 1.2 Defer Await Until Needed, 1.3 Dependency-Based Parallelization, 1. Eliminating Waterfalls (CRITICAL), 1.4 Prevent Waterfall Chains in API Routes, 1.5 Promise.all() for Independent Operations, 1.6 Strategic Suspense Boundaries

### Community 61 - "Layout Thrashing Avoidance"
Cohesion: 0.29
Nodes (7): avoidThrashing (read-then-write batching), Box (React class-toggle example), CSS Triggers, Layout Thrashing (forced synchronous reflow), layoutThrashing (anti-pattern example), Layout thrashing gist (Paul Irish), updateElementStyles (batched style write)

### Community 62 - "Resource Hint Preloading"
Cohesion: 0.25
Nodes (7): preconnect, prefetchDNS, preinit, preinitModule, preload, preloadModule, React DOM Resource Preloading APIs Reference

### Community 63 - "SEO Audit Tooling"
Cohesion: 0.25
Nodes (7): Structured Data Validation, Core Web Vitals, Google Rich Results Test, Google Search Console, Lighthouse SEO Audit, SEO Audit Tools, Type Testing (AssertEqual / ExpectError)

### Community 64 - "Technical SEO"
Cohesion: 0.25
Nodes (8): Canonical URLs, Crawlability, HTTPS and Security Headers, Meta Robots Directives, robots.txt Directives, Technical SEO, URL Structure, XML Sitemap

### Community 65 - "TypeScript Config"
Cohesion: 0.25
Nodes (7): expo/tsconfig.base, compilerOptions, jsx, paths, strict, extends, include

### Community 66 - "Expo Development Client"
Cohesion: 0.38
Nodes (6): Submit an Identified Build to TestFlight, Expo Development Client Skill, Installing Local Dev Client Builds, Local Development Client Builds, Development Client Build to TestFlight, Using the Development Client

### Community 67 - "React 19 Migration"
Cohesion: 0.29
Nodes (5): React 19, React 19 Actions, Context as Provider, use Hook Replaces useContext, useOptimistic

### Community 68 - "Input Validation & Security"
Cohesion: 0.29
Nodes (4): createUserSchema (Zod), validate middleware (Zod), Validation Middleware, Validation Library Selection (Zod/Valibot/ArkType/Yup)

### Community 69 - "Theme Hydration Handling"
Cohesion: 0.43
Nodes (4): React Hydration Mismatch, ThemeWrapper, suppressHydrationWarning, Timestamp

### Community 70 - "Effect Dependency Narrowing"
Cohesion: 0.33
Nodes (5): Derived Boolean Dependency, Primitive Dependency Narrowing, useEffect, Form, You Might Not Need an Effect

### Community 71 - "Event Handler Refactoring"
Cohesion: 0.33
Nodes (6): Form, handleSubmit, post, Should this code move to an event handler? (react.dev removing-effect-dependencies), showToast, ThemeContext

### Community 72 - "Server Action Auth"
Cohesion: 0.38
Nodes (6): deleteUser, Next.js Authentication guide, unauthorized, updateProfile, updateProfileSchema, verifySession

### Community 73 - "RSC Serialization Deduplication"
Cohesion: 0.33
Nodes (5): ClientList, Reference-Based Serialization Deduplication, fetchUser, Page, Profile

### Community 74 - "On-Page SEO"
Cohesion: 0.29
Nodes (7): Google Title Link Guidance, Heading Structure, Image SEO, Internal Linking, Meta Descriptions, On-Page SEO, Title Tags

### Community 75 - "Dev Dependencies"
Cohesion: 0.29
Nodes (7): devDependencies, eslint, eslint-config-expo, @tanstack/react-query, @types/react, @types/react-native, typescript

### Community 76 - "Package Scripts"
Cohesion: 0.29
Nodes (7): scripts, android, ios, lint, reset-project, start, web

### Community 77 - "Expo Router Migration"
Cohesion: 0.53
Nodes (4): react-navigation to expo-router Migration, Expo Codemod Migration, Done Criteria, Manual API Mapping

### Community 78 - "Barrel Import Optimization"
Cohesion: 0.47
Nodes (5): Barrel File, lucide-react, @mui/material, How we optimized package imports in Next.js (Vercel engineering blog), Next.js optimizePackageImports

### Community 79 - "Versioned Local Storage"
Cohesion: 0.53
Nodes (5): cachePrefs (minimal field persistence), loadConfig (versioned storage read), localStorage error handling, migrate (v1 to v2 storage migration), saveConfig (versioned storage write)

### Community 80 - "Array Iteration Fusion"
Cohesion: 0.47
Nodes (4): Repeated Array Iterations, Single-Pass Loop over Users, flatMap, map().filter(Boolean) Chain

### Community 81 - "Early Exit Patterns"
Cohesion: 0.47
Nodes (4): Early Return, validateUsers, hasChanges, Immutable Sorted Array Comparison

### Community 82 - "Lazy State & Search Indexing"
Cohesion: 0.33
Nodes (5): buildSearchIndex, FilteredList, SearchResults, SettingsForm, UserProfile

### Community 83 - "Non-Blocking After API"
Cohesion: 0.33
Nodes (5): after, Next.js after() API reference, logUserAction, POST route handler, updateDatabase

### Community 84 - "Styled Components Theming"
Cohesion: 0.40
Nodes (5): AppThemeColors, AppThemeShape, DefaultTheme, styled-components, styled-components/native/dist/models/ThemeProvider

### Community 85 - "Date Utility Helpers"
Cohesion: 0.47
Nodes (3): formatDate(), getMonthRange(), getWeekRange()

### Community 86 - "Root Package Metadata"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 87 - "Native Tabs Migration"
Cohesion: 0.70
Nodes (5): Native Tabs Migration (SDK 55), NativeTabs.BottomAccessory, Icon md Prop, Native Tabs Migration Checklist, NativeTabs.Trigger Static Properties

### Community 88 - "API Response Envelope"
Cohesion: 0.40
Nodes (5): ApiResponse, ApiResponse.error, API Response Format, ApiResponse.paginated, ApiResponse.success

### Community 89 - "Set/Map Index Lookups"
Cohesion: 0.50
Nodes (3): processOrders, userById Index Map, allowedIds Set

### Community 90 - "Min/Max Without Sort"
Cohesion: 0.40
Nodes (3): getLatestProject, getOldestAndNewest, JSFiddle Array Spread Limit Reference

### Community 91 - "Immutable Array Methods"
Cohesion: 0.50
Nodes (3): Immutable Array Methods (toSorted, toReversed, toSpliced, with), toSorted, UserList

### Community 92 - "Script Loading Strategies"
Cohesion: 0.50
Nodes (4): async Attribute, defer Attribute, MDN Script Element Reference, next/script Component

### Community 93 - "ESLint Configuration"
Cohesion: 0.40
Nodes (4): { defineConfig }, expoConfig, eslint, eslint-config-expo

### Community 94 - "Performance Rule Catalog"
Cohesion: 0.50
Nodes (4): Rendering Performance, Re-render Optimization, React Best Practices Section Catalog, Server-Side Performance

### Community 95 - "Off-Screen Rendering"
Cohesion: 0.67
Nodes (3): contain-intrinsic-size, MessageList, Off-Screen Rendering Skip

### Community 96 - "Responsive Derived State"
Cohesion: 0.67
Nodes (3): Sidebar, useMediaQuery, useWindowWidth

### Community 97 - "Expo Versioned Docs Policy"
Cohesion: 0.67
Nodes (3): Expo Versioned Docs Requirement (AGENTS.md), Expo SDK 54 Versioned Documentation, CLAUDE.md Agent Instructions

### Community 98 - "Cache Service API"
Cohesion: 1.00
Nodes (3): CacheService.get, CacheService.set, Cacheable decorator

### Community 99 - "Rate Limiting Middleware"
Cohesion: 1.00
Nodes (3): apiLimiter, authLimiter, Rate Limiting Middleware

### Community 100 - "Node Framework Setup"
Cohesion: 0.67
Nodes (3): Core Frameworks (Express, Fastify), Express.js Setup, Fastify Setup

## Knowledge Gaps
- **278 isolated node(s):** `@expo/vector-icons`, `@react-navigation/bottom-tabs`, `@react-navigation/elements`, `@react-navigation/native`, `css-to-react-native` (+273 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 411 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAgenda()` connect `API Client, Auth & Session` to `App Screens & Patient Flows`, `Expo Router Loaders & Offline`, `Agenda Feature Module`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `@expo/vector-icons`, `@react-navigation/bottom-tabs`, `@react-navigation/elements` to the rest of the system?**
  _278 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Screens & Patient Flows` be split into smaller, more focused modules?**
  _Cohesion score 0.05476190476190476 - nodes in this community are weakly interconnected._
- **Should `Shared Header & Profile UI` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `API Client, Auth & Session` be split into smaller, more focused modules?**
  _Cohesion score 0.07826546800634585 - nodes in this community are weakly interconnected._
- **Should `Accessibility Patterns & WCAG` be split into smaller, more focused modules?**
  _Cohesion score 0.07149758454106281 - nodes in this community are weakly interconnected._
- **Should `Design System & Color Tokens` be split into smaller, more focused modules?**
  _Cohesion score 0.09390243902439024 - nodes in this community are weakly interconnected._