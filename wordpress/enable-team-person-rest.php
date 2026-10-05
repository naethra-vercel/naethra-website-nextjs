<?php
/**
 * Drop this into the TheGem child theme's functions.php (or a small custom plugin / mu-plugin).
 * Enables REST access for Team Persons + Teams taxonomy so the headless frontend can
 * load the About page team (team-2x-2 / team-3x on naethra.com).
 *
 * Endpoints after save/flush:
 *   GET https://naethra.com/wp-json/wp/v2/thegem_team_person?_embed&per_page=20
 *   GET https://naethra.com/wp-json/wp/v2/thegem_teams
 *   GET https://naethra.com/wp-json/wp/v2/thegem_team_person?thegem_teams=TERM_ID&_embed
 */

add_filter("register_post_type_args", function ($args, $post_type) {
  if ($post_type !== "thegem_team_person") {
    return $args;
  }

  $args["show_in_rest"] = true;
  $args["rest_base"] = "thegem_team_person";
  $args["rest_controller_class"] = "WP_REST_Posts_Controller";

  if (empty($args["supports"]) || !is_array($args["supports"])) {
    $args["supports"] = ["title", "editor", "thumbnail", "excerpt", "page-attributes"];
  } else {
    $args["supports"] = array_values(
      array_unique(array_merge($args["supports"], ["thumbnail", "editor", "page-attributes"])),
    );
  }

  return $args;
}, 20, 2);

add_filter("register_taxonomy_args", function ($args, $taxonomy) {
  if ($taxonomy !== "thegem_teams") {
    return $args;
  }

  $args["show_in_rest"] = true;
  $args["rest_base"] = "thegem_teams";
  $args["rest_controller_class"] = "WP_REST_Terms_Controller";

  return $args;
}, 20, 2);

add_action("rest_api_init", function () {
  register_rest_field("thegem_team_person", "person", [
    "get_callback" => function ($object) {
      $post_id = (int) $object["id"];

      if (function_exists("thegem_get_sanitize_team_person_data")) {
        $data = thegem_get_sanitize_team_person_data($post_id);
        return [
          "name" => $data["name"] ?? get_the_title($post_id),
          "position" => $data["position"] ?? "",
          "phone" => $data["phone"] ?? "",
          "email" => $data["email"] ?? "",
          "link" => $data["link"] ?? "",
        ];
      }

      $meta = get_post_meta($post_id);
      $pick = function (array $keys) use ($meta) {
        foreach ($keys as $key) {
          if (!empty($meta[$key][0])) {
            return maybe_unserialize($meta[$key][0]);
          }
        }
        return "";
      };

      $packed = $pick([
        "thegem_team_person_data",
        "thegem_team_data",
        "_thegem_team_person_data",
      ]);

      if (is_array($packed)) {
        return [
          "name" => $packed["name"] ?? get_the_title($post_id),
          "position" => $packed["position"] ?? "",
          "phone" => $packed["phone"] ?? "",
          "email" => $packed["email"] ?? "",
          "link" => $packed["link"] ?? "",
        ];
      }

      return [
        "name" => get_the_title($post_id),
        "position" => (string) $pick(["position", "thegem_team_person_position"]),
        "phone" => "",
        "email" => "",
        "link" => "",
      ];
    },
    "schema" => [
      "description" => "TheGem team person fields",
      "type" => "object",
      "context" => ["view", "edit"],
      "readonly" => true,
    ],
  ]);

  register_rest_field("thegem_team_person", "teams", [
    "get_callback" => function ($object) {
      $terms = get_the_terms((int) $object["id"], "thegem_teams");
      if (empty($terms) || is_wp_error($terms)) {
        return [];
      }

      return array_values(
        array_map(static function ($term) {
          return [
            "id" => (int) $term->term_id,
            "slug" => $term->slug,
            "name" => $term->name,
          ];
        }, $terms),
      );
    },
    "schema" => [
      "description" => "TheGem team category terms for this person",
      "type" => "array",
      "context" => ["view", "edit"],
      "readonly" => true,
    ],
  ]);
});
