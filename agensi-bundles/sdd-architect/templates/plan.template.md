# Technical Architecture & Plan: [Feature Name]

**Spec Reference:** `specs/[feature-name].md`  

---

## 1. Entity-Relationship Data Models
\`\`\`sql
-- Primary entity schema
CREATE TABLE IF NOT EXISTS [entity_name] (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_[entity_name]_user ON [entity_name](user_id);
CREATE INDEX idx_[entity_name]_status ON [entity_name](status);
\`\`\`

---

## 2. API Contract Specification
### Endpoint: `POST /api/v1/[resource]`
* **Auth Required:** Bearer JWT (Role: User | Admin)
* **Request Headers:** `Content-Type: application/json`
* **Request Payload Schema:**
\`\`\`json
{
  "title": "string (min: 3, max: 255)",
  "metadata": {}
}
\`\`\`
* **Response Status Codes:**
  * `201 Created`: Returns created record object.
  * `400 Bad Request`: Payload validation failed with field error map.
  * `401 Unauthorized`: Missing or invalid session token.
  * `500 Internal Error`: Sanitized error code (no stack traces leaked).

---

## 3. Component Hierarchy & State Flow
\`\`\`
[FeatureContainer]
   ├── [HeaderBar] (Title + Action CTAs)
   ├── [FilterControls] (State: search, filterBy)
   ├── [DataGrid] (State: items[], isLoading, error)
   │     └── [RowItem] (Optimistic action handlers)
   └── [ModalDrawer] (State: isOpen, activeRecord)
\`\`\`
